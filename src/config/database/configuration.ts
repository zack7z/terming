import { registerAs } from '@nestjs/config';
export default registerAs('db', () => ({
  type: process.env.DB_TYPE,
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  uri: process.env.DB_URI,
}));
