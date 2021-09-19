import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import configuration from './configuration';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtConfigService } from './configuration.service';
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
        JWT_SECRET: Joi.string(),
        JWT_EXPIRES_IN: Joi.number(),
      }),
    }),
  ],
  providers: [ConfigService, JwtConfigService],
  exports: [JwtConfigService],
})
export class JwtConfigModule {}
