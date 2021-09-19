import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { format, transports } from 'winston';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston/dist/winston.utilities';
import * as DailyRotateFile from 'winston-daily-rotate-file';

@Module({
  imports: [
    WinstonModule.forRoot({
      format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.prettyPrint(),
      ),
      transports: [
        new transports.Console({
          format: format.combine(
            format.timestamp(),
            format.ms(),
            nestWinstonModuleUtilities.format.nestLike(),
          ),
        }),

        new DailyRotateFile({
          level: 'error',
          filename: 'logs/errors/%DATE%.log',
        }),

        new transports.File({
          level: 'info',
          filename: 'logs/info/info.log',
        }),
      ],
      // other options
    }),
  ],
})
export class LoggerProviderModule {}
