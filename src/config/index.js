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
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  CLOUDINARY_FOLDER: process.env.CLOUDINARY_FOLDER,
  MONGO_URI: process.env.MONGO_URI,
};

module.exports = { CONFIG };
