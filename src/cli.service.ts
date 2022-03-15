import { Inject, Injectable, Optional, Scope, Type } from '@nestjs/common';
import { ContextIdFactory, ModuleRef, REQUEST } from '@nestjs/core';
import * as yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { CommandRegistry } from './command-registry';
import { CommandMetadata } from './types/command-options';

@Injectable({ scope: Scope.REQUEST })
export class CliService {
  constructor(
    private moduleRef: ModuleRef,
    @Inject(REQUEST)
    @Optional()
    private request?: Record<string, unknown>,
  ) {}

  async exec(args = hideBin(process.argv)) {
    const cli = this.build();
    return await cli.parseAsync(args);
  }

  build() {
    const cli = yargs.scriptName('cli').demandCommand(1).strict();

    CommandRegistry.getCommands().forEach((meta) => {
      const handler = async (rawArgs: yargs.ArgumentsCamelCase<any>) => {
        const args = this.resolveArguments(meta, rawArgs);
        await this.resolveAndExecuteTarget(meta.target, meta.propertyKey, args);
      };

      cli.command(
        meta.options.name,
        meta.options.description,
        (builder) => {
          meta.positionals.forEach((argMeta) => {
            builder = builder.positional(argMeta.options.name, argMeta.options);
          });

          meta.optionals.forEach((argMeta) => {
            builder = builder.option(argMeta.options.name, argMeta.options);
          });

          return builder;
        },
        handler,
      );
    });

    return cli;
  }

  async resolveAndExecuteTarget(
    target: string | symbol | Type<any>,
    propertyKey: string | symbol,
    args: any[],
  ) {
    const contextId = this.request
      ? ContextIdFactory.getByRequest(this.request)
      : ContextIdFactory.create();

    const instance = await this.moduleRef.resolve(target, contextId, {
      strict: false,
    });

    if (typeof instance[propertyKey] !== 'function') {
      throw new Error(
        `CliService: Property '${String(propertyKey)}' on target '${String(
          target,
        )}' does not exist or is not a function.`,
      );
    }

    await instance[propertyKey](...args);
  }

  resolveArguments(
    meta: CommandMetadata,
    rawArgs: yargs.ArgumentsCamelCase<any>,
  ) {
    const args: any[] = [];

    meta.positionals.forEach((posMeta) => {
      args[posMeta.parameterIndex] = rawArgs[posMeta.options.name] ?? undefined;
    });

    return args;
  }
}
