import { Module } from '@nestjs/common';
import { AppCommand } from './app.command';
import { AppService } from './app.service';
import { CliModule } from '../src';
@Module({
  imports: [CliModule],
  controllers: [],
  providers: [AppService, AppCommand],
})
export class AppModule {}
