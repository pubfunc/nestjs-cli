import { INestApplicationContext } from '@nestjs/common';
import { ContextIdFactory } from '@nestjs/core/helpers';
import { NestFactory } from '@nestjs/core/nest-factory';
import { REQUEST_CONTEXT_ID } from 'example/node_modules/@nestjs/core/router/request/request-constants';
import { YargsModule, YargsService } from '../src';
import { AppModule } from './app.module';

describe('YargsModule (e2e)', () => {
  let app: INestApplicationContext;
  let cliService: YargsService;

  beforeAll(async () => {
    const app = await NestFactory.createApplicationContext(AppModule, {});

    const contextId = ContextIdFactory.create();

    app.registerRequestByContextId(
      { cli: true, [REQUEST_CONTEXT_ID]: contextId },
      contextId,
    );

    cliService = await app.select(YargsModule).resolve(YargsService, contextId);
  });

  it('runs commands', async () => {
    await expect(
      cliService.exec(['debug', 'someValue', 'true']),
    ).rejects.toThrowError();
  });
});
