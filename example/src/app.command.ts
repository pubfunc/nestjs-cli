import { Injectable, Scope } from '@nestjs/common';
import { Command, Option, Positional } from '@pubfunc/nestjs-yargs';
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
    @Option('option1', {
      alias: 'o1',
      type: 'number',
      default: 500,
      requiresArg: true,
    })
    option1: number,
    @Option('option2', {
      alias: 'o2',
      type: 'string',
    })
    option2: number,
  ) {
    console.log('executing async debug', {
      argument1,
      argument2,
      option1,
      option2,
    });

    await new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 100);
    });

    console.log('completed async debug');
  }
}
