import { ContextIdFactory, NestFactory } from '@nestjs/core';
import { REQUEST_CONTEXT_ID } from '@nestjs/core/router/request/request-constants';
import { Module } from 'example/node_modules/@nestjs/common';
import { YargsModule } from './yargs.module';
import { YargsService } from './yargs.service';

@Module({
  imports: [YargsModule.forRoot()],
})
export class YargsCliModule {}

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(YargsCliModule, {});

  const contextId = ContextIdFactory.create();

  app.registerRequestByContextId(
    { cli: true, [REQUEST_CONTEXT_ID]: contextId },
    contextId,
  );

  const cli = await app.resolve(YargsService, contextId, { strict: false });

  try {
    await cli.exec();

    await app.close();
  } catch (error) {
    await app.close();
    process.exit(1);
  }
}

bootstrap();
