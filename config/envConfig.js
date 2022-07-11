const dotenv = require('dotenv');
dotenv.config();


module.exports = {
  /* ----- App-related environment variables ----- */
  APP: {
    PORT: process.env.PORT,
    BASE_URL: process.env.BASE_URL
  },
  /* ----- Database-related environment variables ----- */
  DB: {
    URL: process.env.DB_URL
  },
  /* ----- Auth-related environment variables ----- */
  AUTH: {
    USER_SECRET: process.env.USER_SECRET
  },
  /* ----- Email-related environment variables */
  EMAIL: {
    HOST: process.env.EMAIL_HOST,
    SERVICE: process.env.EMAIL_SERVICE,
    USER: process.env.EMAIL_USER,
    PASS: process.env.EMAIL_PASS
  }
}