const dotenv = require("dotenv");

dotenv.config();

const CONFIG = {
  DB_PROVIDER: process.env.DB_PROVIDER,
  PORT: process.env.PORT,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  APP_TIMEZONE: process.env.APP_TIMEZONE,
  FRONTEND_URL: process.env.FRONTEND_URL,
  MAIL_FROM: process.env.MAIL_FROM,
  MAIL_HOST: process.env.MAIL_HOST,
  MAIL_PORT: process.env.MAIL_PORT,
  MAIL_USER: process.env.MAIL_USER,
  MAIL_PASS: process.env.MAIL_PASS,
};

module.exports = { CONFIG };
