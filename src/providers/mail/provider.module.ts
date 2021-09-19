import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { MailerProviderService } from './provider.service';
import { MailConfigModule } from '../../config/mail/configuration.module';
import { MailConfigService } from '../../config/mail/configuration.service';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [MailConfigModule],
      useFactory: ({
        from,
        host,
        ignoreTLS,
        password,
        port,
        preview,
        secure,
        username,
      }: MailConfigService) => ({
        transport: {
          host: host,
          port: port,
          ignoreTLS: ignoreTLS,
          secure: secure,
          auth: {
            user: username,
            pass: password,
          },
        },
        defaults: {
          from: from,
        },
        preview: preview,
        template: {
          dir: process.cwd() + '/src/views/mail',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [MailConfigService],
    }),
  ],
  providers: [MailerProviderService],
  exports: [MailerProviderService],
})
export class MailerProviderModule {}
