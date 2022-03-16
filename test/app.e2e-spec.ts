import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './app.module';
import { YargsModule, YargsService } from '../src';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let cliService: YargsService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    cliService = await app.select(YargsModule).resolve(YargsService);
  });

  it('runs commands', async () => {
    await expect(
      cliService.exec(['debug', 'someValue', 'true']),
    ).rejects.toThrowError();
  });
});
