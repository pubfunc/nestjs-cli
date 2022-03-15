import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './app.module';
import { CliModule, CliService } from '../src';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let cliService: CliService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    cliService = await app.select(CliModule).resolve(CliService);
  });

  it('runs commands', async () => {
    await expect(cliService.exec(['debug', 'true'])).rejects.toThrowError();
  });
});
