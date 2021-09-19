import { registerAs } from '@nestjs/config';
export default registerAs('mail', () => ({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  ignoreTLS: process.env.MAIL_IGNORE_TLS,
  secure: process.env.MAIL_secure,
  username: process.env.MAIL_USERNAME,
  password: process.env.MAIL_PASSWORD,
  from: process.env.MAIL_FROM,
  preview: process.env.MAIL_PREVIEW,
}));
