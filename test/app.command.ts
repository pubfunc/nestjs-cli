import { Injectable, Scope } from '@nestjs/common';
import { Command, Option, Positional } from '../src';
import { AppService } from './app.service';

@Injectable({ scope: Scope.REQUEST })
export class AppCommand {
  constructor(private readonly service: AppService) {}

  @Command('debug <arg1> [arg2]', { description: 'Debug command' })
  async debug(
    @Positional('arg1', {
      type: 'string',
    })
    argument1: string,
    @Positional('arg2', {
      type: 'boolean',
      default: true,
    })
    argument2: boolean,
    @Option('log', {
      alias: 'l',
      type: 'number',
      default: 500,
      requiresArg: true,
    })
    delay: number,
  ) {
    await new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 10);
    });

    return [argument1, argument2, delay];
  }
}
