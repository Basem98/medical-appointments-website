const winston = require('winston');
const { APP } = require('./envConfig');


/* ---------- Define log severity levels ---------- */
const severityLevels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4
}


/* ---------- Define the server's current severity level based on mode ---------- */
const currentLevel = () => (APP.NODE_ENV === 'development' ? 'debug' : 'warn');


/* ---------- Define the log colors based on severity ---------- */
const logColors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'blue'
}
winston.addColors(logColors);


/* ---------- Define the logging options for each output stream ---------- */
const logFormat = [
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`,
  )
]
const logOptions = {
  console: {
    handleExceptions: true,
    level: 'debug',
    format: winston.format.combine(...logFormat, winston.format.colorize({ all: true }))
  },
  errors: {
    filename: 'logs/errors.log',
    level: 'error',
    format: winston.format.combine(...logFormat)
  },
  general: {
    filename: 'logs/general.log',
    format: winston.format.combine(...logFormat)
  }
}


/* ---------- Define the streams for the logs output ---------- */
const logStreams = [
  new winston.transports.Console(logOptions.console),
  new winston.transports.File(logOptions.errors),
  new winston.transports.File(logOptions.general)
];


/* ---------- Create the logger to be used in the morgan middleware ---------- */
const logger = winston.createLogger({
  level: currentLevel(),
  levels: severityLevels,
  transports: logStreams
});


module.exports = logger;