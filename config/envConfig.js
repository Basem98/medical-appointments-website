const dotenv = require('dotenv');
dotenv.config();


module.exports = {
  /* ----- App-related environment variables ----- */
  APP: {
    PORT: process.env.PORT
  },
  /* ----- Database-related environment variables ----- */
  DB: {}
}