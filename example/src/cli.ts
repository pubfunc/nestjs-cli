import { ContextIdFactory, NestFactory } from '@nestjs/core';
import { REQUEST_CONTEXT_ID } from '@nestjs/core/router/request/request-constants';
import { AppModule } from './app.module';
import { YargsService, YargsModule } from '@pubfunc/nestjs-yargs';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    const contextId = ContextIdFactory.create();

    app.registerRequestByContextId(
      { cli: true, [REQUEST_CONTEXT_ID]: contextId },
      contextId,
    );

    await (
      await app.select(YargsModule).resolve(YargsService, contextId)
    ).exec();

    await app.close();
  } catch (error) {
    console.error(error);
    await app.close();
    process.exit(1);
  }
}

bootstrap();
