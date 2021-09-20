import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AppConfigService } from './config/app/configuration.service';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig: AppConfigService = app.get(AppConfigService);

  app.enableCors();
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'api/v',
  });

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
