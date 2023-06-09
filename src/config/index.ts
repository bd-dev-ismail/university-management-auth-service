import dotenv from 'dotenv';
import path from 'path';
// eslint-disable-next-line no-undef
dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  // eslint-disable-next-line no-undef
  env: process.env.NODE_DEV,
  port: process.env.PORT || 5000,
  // eslint-disable-next-line no-undef
  database_url: process.env.DATABASE_URL,
  // eslint-disable-next-line no-undef
  default_user_password: process.env.DEFAULT_USER_PASS,
};
