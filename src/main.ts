import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import './firebase/firebase-admin'
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors()
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Converts payloads to DTO instances
      transformOptions: {
        enableImplicitConversion: true, // Allows automatic type conversion
      },
    }),
  );
  await app.listen(3000);
}
bootstrap();
