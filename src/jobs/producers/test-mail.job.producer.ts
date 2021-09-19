import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { MailerProviderService } from '../../providers/mail/provider.service';
import { MailerOptionsInterface } from '../../providers/mail/mailer-options.interface';

@Injectable()
export class TestMailJobProducer {
  constructor(
    @InjectQueue('mail') private readonly mailQueue: Queue,
    private readonly mailerService: MailerProviderService,
  ) {}

  dispatch(to: string) {
    this.mailQueue.add(
      {
        to: to,
        subject: 'test mail dude',
        template: 'test',
      },
      {
        priority: 1,
        delay: 500,
      },
    );
  }
}
