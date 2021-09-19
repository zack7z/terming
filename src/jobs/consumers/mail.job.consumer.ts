import {
  Processor,
  Process,
  OnGlobalQueueCompleted,
  InjectQueue,
  OnGlobalQueueRemoved,
  OnQueueDrained, OnGlobalQueueDrained
} from '@nestjs/bull';
import { Job, Queue } from 'bull';
import { MailerProviderService } from '../../providers/mail/provider.service';
import { MailerOptionsInterface } from '../../providers/mail/mailer-options.interface';

@Processor('mail')
export class MailJobConsumer {
  constructor(
    private readonly mailerService: MailerProviderService,
    @InjectQueue('mail') private readonly mailQueue: Queue,
  ) {}

  @Process()
  async handle(job: Job<unknown>) {
    this.mailerService.sendMail(job.data as MailerOptionsInterface);
  }

  @OnGlobalQueueCompleted()
  async onGlobalCompleted(jobId: number, result: any) {
    const job = await this.mailQueue.getJob(jobId);
    console.log('(Global) on completed: job ', job.id, ' -> result: ', result);
  }

  @OnGlobalQueueDrained()
  async onGlobalDrained(jobId: number, result: any) {
    const job = await this.mailQueue.getJob(jobId);
    console.log('(Global) on Drained: job ');
  }
}
