import { DynamicModule, Module } from '@nestjs/common';
import { YargsService } from './yargs.service';

@Module({})
export class YargsModule {
  static forRoot(): DynamicModule {
    return {
      module: YargsModule,
      providers: [YargsService],
      exports: [YargsService],
      global: true,
    };
  }
}
