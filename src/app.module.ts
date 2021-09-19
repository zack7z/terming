import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './config/app/configuration.module';
import { LoggerProviderModule } from './providers/logger/provider.module';
import { MongooseProviderModule } from './providers/database/mongoose/provider.module';

@Module({
  imports: [
    AppConfigModule,
    LoggerProviderModule,
    MongooseProviderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
