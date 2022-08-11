const dotenv = require('dotenv');
dotenv.config();


module.exports = {
  /* ----- App-related environment variables ----- */
  APP: {
    PORT: process.env.PORT,
    BASE_URL: process.env.BASE_URL,
    ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN,
    NODE_ENV: process.env.NODE_ENV
  },
  /* ----- Database-related environment variables ----- */
  DB: {
    URL: process.env.DB_URL
  },
  /* ----- Auth-related environment variables ----- */
  AUTH: {
    USER_SECRET: process.env.USER_SECRET,
    DOCTOR_SECRET: process.env.DOCTOR_SECRET,
    ADMIN_SECRET: process.env.ADMIN_SECRET
  },
  /* ----- Email-related environment variables */
  EMAIL: {
    HOST: process.env.EMAIL_HOST,
    SERVICE: process.env.EMAIL_SERVICE,
    USER: process.env.EMAIL_USER,
    PASS: process.env.EMAIL_PASS,
    AT: process.env.EMAIL_AT
  },
  /* ----- Cloudinary-related environment variables */
  CLOUDINARY: {
    NAME: process.env.CLOUD_NAME,
    KEY: process.env.CLOUD_KEY,
    SECRET: process.env.CLOUD_SECRET,
  }
}