import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import configuration from './configuration';
import { MailConfigService } from './configuration.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
        MAIL_HOST: Joi.string().default(''),
        MAIL_PORT: Joi.number().default(465),
        MAIL_IGNORE_TLS: Joi.boolean().default(false),
        MAIL_secure: Joi.boolean().default(true),
        MAIL_USERNAME: Joi.string().default(''),
        MAIL_PASSWORD: Joi.string().default(''),
        MAIL_FROM: Joi.string().default(''),
        MAIL_PREVIEW: Joi.boolean().default(false),
      }),
    }),
  ],
  providers: [ConfigService, MailConfigService],
  exports: [ConfigService, MailConfigService],
})
export class MailConfigModule {}
