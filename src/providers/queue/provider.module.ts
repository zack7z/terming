import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { RedisConfigModule } from '../../config/redis/configuration.module';
import { RedisConfigService } from '../../config/redis/configuration.service';

@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [RedisConfigModule],
      inject: [RedisConfigService],
      useFactory: async ({
        host,
        password,
        port,
        username,
      }: RedisConfigService) => ({
        redis: {
          host: host,
          port: port,
          username: username,
          password: password,
        },
      }),
    }),
  ],
})
export class QueueProviderModule {}
