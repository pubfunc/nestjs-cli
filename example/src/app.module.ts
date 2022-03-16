import { Module } from '@nestjs/common';
import { AppCommand } from './app.command';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { YargsModule } from '@pubfunc/nestjs-yargs';
@Module({
  imports: [YargsModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, AppCommand],
})
export class AppModule {}
