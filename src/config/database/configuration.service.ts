import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
/**
 * Service dealing with app config based operations.
 *
 * @class
 */
@Injectable()
export class DbConfigService {
  constructor(private configService: ConfigService) {}

  get type(): string {
    return this.configService.get<string>('db.type');
  }

  get port(): number {
    return this.configService.get<number>('db.port');
  }

  get host(): string {
    return this.configService.get<string>('db.host');
  }

  get username(): string {
    return this.configService.get<string>('db.username');
  }

  get password(): string {
    return this.configService.get<string>('db.password');
  }

  get database(): string {
    return this.configService.get<string>('db.database');
  }

  get uri(): string {
    return this.configService.get<string>('db.uri');
  }
}
