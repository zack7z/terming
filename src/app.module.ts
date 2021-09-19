import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './config/app/configuration.module';
import { MailerProviderModule } from './providers/mail/provider.module';
import { QueueProviderModule } from './providers/queue/provider.module';
import { BullModule } from '@nestjs/bull';
import { TestMailJobProducer } from './jobs/producers/test-mail.job.producer';
import { MailJobConsumer } from './jobs/consumers/mail.job.consumer';
import { LoggerProviderModule } from './providers/logger/provider.module';
import { MongooseProviderModule } from './providers/database/mongoose/provider.module';

@Module({
  imports: [
    AppConfigModule,
    LoggerProviderModule,
    MongooseProviderModule,
    QueueProviderModule,
    MailerProviderModule,
    BullModule.registerQueue({
      name: 'mail',
    }),
  ],
  controllers: [AppController],
  providers: [AppService, TestMailJobProducer, MailJobConsumer],
})
export class AppModule {}
