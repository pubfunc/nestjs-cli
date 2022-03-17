import { Module } from '@nestjs/common';
import { AppCommand } from './app.command';
import { AppService } from './app.service';
import { YargsModule } from '../src';
@Module({
  imports: [YargsModule.forRoot()],
  controllers: [],
  providers: [AppService, AppCommand],
})
export class AppModule {}
