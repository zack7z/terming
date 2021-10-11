import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AppConfigService } from './config/app/configuration.service';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { MongoExceptionFilter } from './common/exceptions/mongo-exception.filter';
import * as mongoose from 'mongoose';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig: AppConfigService = app.get(AppConfigService);

  app.enableCors();

  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'api/v',
  });
  app.useGlobalFilters(new MongoExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  if (process.env.NODE_ENV != 'production') mongoose.set('debug', true);

  initSwagger(app);

  await app.listen(process.env.PORT || appConfig.port || 3000);
}

bootstrap();

function initSwagger(app) {
  const config = new DocumentBuilder()
    .setTitle('Terming')
    .setDescription('The Terming API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'Terming API Docs',
  };
  SwaggerModule.setup('open-api/v1', app, document, customOptions);
}
