import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import configuration from './configuration';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DbConfigService } from './configuration.service';
/**
 * Import and provide app configuration related classes.
 *
 * @module
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        DB_TYPE: Joi.string().default('mysql'),
        DB_PORT: Joi.number().default(3306),
        DB_NAME: Joi.string().default('MyDb'),
        DB_HOST: Joi.string().default('localhost'),
        DB_USERNAME: Joi.string().default('root'),
        DB_PASSWORD: Joi.string().allow(''),
        DB_URI: Joi.string().allow(''),
      }),
    }),
  ],
  providers: [ConfigService, DbConfigService],
  exports: [ConfigService, DbConfigService],
})
export class DbConfigModule {}
