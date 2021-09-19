import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
/**
 * Service dealing with app config based operations.
 *
 * @class
 */
@Injectable()
export class MailConfigService {
  constructor(private configService: ConfigService) {}

  get host(): string {
    return this.configService.get<string>('mail.host');
  }
  get port(): number {
    return this.configService.get<number>('mail.port');
  }
  get ignoreTLS(): boolean {
    return eval(this.configService.get<string>('mail.ignoreTLS'));
  }
  get secure(): boolean {
    return eval(this.configService.get<string>('mail.secure'));
  }
  get username(): string {
    return this.configService.get<string>('mail.username');
  }
  get password(): string {
    return this.configService.get<string>('mail.password');
  }
  get from(): string {
    return this.configService.get<string>('mail.from');
  }
  get preview(): boolean {
    return eval(this.configService.get<string>('mail.preview'));
  }
}
