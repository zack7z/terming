import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './config/app/configuration.module';
import { LoggerProviderModule } from './providers/logger/provider.module';
import { MongooseProviderModule } from './providers/database/mongoose/provider.module';
import { VenuesModule } from './models/venues/venues.module';
import { CourseCategoriesModule } from './models/course-categories/course-categories.module';

@Module({
  imports: [
    AppConfigModule,
    LoggerProviderModule,
    MongooseProviderModule,
    VenuesModule,
    CourseCategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
