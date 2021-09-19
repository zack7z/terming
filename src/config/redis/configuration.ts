import { registerAs } from '@nestjs/config';
export default registerAs('redis', () => ({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
}));
