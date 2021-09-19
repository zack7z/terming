import { NestFactory } from '@nestjs/core';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerCustomOptions,
} from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AppConfigService } from './config/app/configuration.service';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig: AppConfigService = app.get(AppConfigService);

  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  initSwagger(app);

  await app.listen(appConfig.port);
}

bootstrap();

function initSwagger(app) {
  const config = new DocumentBuilder()
    .setTitle('Example')
    .setDescription('The example API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'My API Docs',
  };
  SwaggerModule.setup('api/v1', app, document, customOptions);
}
