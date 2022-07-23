const cors = require('cors');
const {APP} = require('./envConfig');

module.exports = function() {
  let options = {
    origin: APP.ALLOWED_ORIGIN
  }
  return cors(options);
}