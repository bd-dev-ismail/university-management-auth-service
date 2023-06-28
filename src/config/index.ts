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
  default_student_password: process.env.DEFAULT_STUDENT_PASS,
  default_faculty_password: process.env.DEFAULT_FACULTY_PASS,
  default_admin_password: process.env.DEFAULT_ADMIN_PASS,
  bcrypt_salt_rounds: process.env.BCRYPT_SOLT_ROUNDS,
};
