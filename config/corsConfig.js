const cors = require('cors');
const { APP } = require('./envConfig');

module.exports = function () {
  let options = {
    // origin: APP.ALLOWED_ORIGIN,
    origin: true,
    credentials: true
  }
  return cors(options);
}