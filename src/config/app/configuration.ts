import { registerAs } from '@nestjs/config';
export default registerAs('app', () => ({
  name: process.env.APP_NAME,
  url: process.env.APP_URL,
  port: process.env.APP_PORT,
}));
