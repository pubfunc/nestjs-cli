import { ContextIdFactory, NestFactory } from '@nestjs/core';
import { REQUEST_CONTEXT_ID } from '@nestjs/core/router/request/request-constants';
import { AppModule } from './app.module';
import { CliService, CliModule } from '@pubfunc/nestjs-cli';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    const contextId = ContextIdFactory.create();

    app.registerRequestByContextId(
      { cli: true, [REQUEST_CONTEXT_ID]: contextId },
      contextId,
    );

    await (await app.select(CliModule).resolve(CliService, contextId)).exec();

    // LOG MEMORY USAGE
    // https://www.valentinog.com/blog/node-usage/
    const arr = [1, 2, 3, 4, 5, 6, 9, 7, 8, 9, 10];
    arr.reverse();
    const used = process.memoryUsage() as any;
    for (const key in used) {
      console.log(
        `${key} ${Math.round((used[key] / 1024 / 1024) * 100) / 100} MB`,
      );
    }
    // LOG MEMORY USAGE END
    await app.close();
  } catch (error) {
    console.error(error);
    await app.close();
    process.exit(1);
  }
}

bootstrap();
