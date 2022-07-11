const dotenv = require('dotenv');
dotenv.config();


module.exports = {
  /* ----- App-related environment variables ----- */
  APP: {
    PORT: process.env.PORT
  },
  /* ----- Database-related environment variables ----- */
  DB: {
    URL: process.env.DB_URL
  },
  /* ----- Auth-related environment variables ----- */
  AUTH: {
    USER_SECRET: process.env.USER_SECRET
  }
}