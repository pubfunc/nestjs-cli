import { Module } from '@nestjs/common';
import { CliService } from './cli.service';

@Module({
  providers: [CliService],
  exports: [],
})
export class CliModule {}
