import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MailerProviderService } from './providers/mail/provider.service';
import { TestMailJobProducer } from './jobs/producers/test-mail.job.producer';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly mailerService: MailerProviderService,
    private readonly testMailJobProducer: TestMailJobProducer,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/mail')
  mailTest(): void {
    this.testMailJobProducer.dispatch('hey_you808@yahoo.com');
  }
}
