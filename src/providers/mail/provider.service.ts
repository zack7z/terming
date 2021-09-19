import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { MailerOptionsInterface } from './mailer-options.interface';

@Injectable()
export class MailerProviderService {
  constructor(private readonly mailerService: MailerService) {}
  sendMail({
    context,
    subject,
    template,
    text,
    to,
  }: MailerOptionsInterface): void {
    this.mailerService
      .sendMail({
        to: to, // list of receivers
        subject: subject, // Subject line
        template: process.cwd() + '/src/views/mail/' + template,
        context: context,
        text: text,
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
