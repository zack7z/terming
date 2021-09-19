import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DbConfigModule } from '../../../config/database/configuration.module';
import { DbConfigService } from '../../../config/database/configuration.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [DbConfigModule],
      inject: [DbConfigService],
      useFactory: (dbConfigService: DbConfigService) => ({
        uri: dbConfigService.uri,
      }),
    }),
  ],
})
export class MongooseProviderModule {}
