const morgan = require('morgan');
const logger = require('../config/logger');

/* ---------- Define a stream object to override the default morgan stream ---------- */
const stream = {
  write: message => logger.http(message)
};

const morganMiddleware = morgan(':remote-addr :method :url :status :res[content-length] - :response-time ms', { stream });


module.exports = morganMiddleware;