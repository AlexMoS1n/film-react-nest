import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { TSKVLogger } from './loggers/tskv.logger';
import { DevLogger } from './loggers/dev.logger';
import { JsonLogger } from './loggers/json.logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.setGlobalPrefix('api/afisha');
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(
    app.get('CONFIG').mode === 'dev'
      ? new DevLogger()
      : app.get('CONFIG').mode === 'prod' && app.get('CONFIG').logger === 'json'
        ? new JsonLogger()
        : new TSKVLogger(),
  );
  await app.listen(3000);
}
bootstrap();
