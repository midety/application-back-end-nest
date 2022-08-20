import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { RedocModule, RedocOptions } from 'nestjs-redoc';

async function bootstrap() {
  const V1_PREFIX = '/api/v1';

  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  app.setGlobalPrefix(V1_PREFIX);

  const config = new DocumentBuilder()
    .setTitle('Applications API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  const redocOptions: RedocOptions = {
    sortPropsAlphabetically: true,
    hideDownloadButton: false,
    hideHostname: false,
  };

  await RedocModule.setup(`${V1_PREFIX}/docs`, app, document, redocOptions);

  await app.listen(3000);
}
bootstrap();
