import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import configuration from './configuration';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {RedisConfigService} from "./configuration.service";
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
        REDIS_PORT: Joi.number().default(6379),
        REDIS_HOST: Joi.string().default('localhost'),
        REDIS_USERNAME: Joi.string().allow('').default(''),
        REDIS_PASSWORD: Joi.string().allow('').default(''),
      }),
    }),
  ],
  providers: [ConfigService, RedisConfigService],
  exports: [ConfigService, RedisConfigService],
})
export class RedisConfigModule {}
