import { Module } from '@nestjs/common';
import { AppCommand } from './app.command';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CliService } from './cli.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, CliService, AppCommand],
})
export class AppModule {}
