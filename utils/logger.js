const { transports, createLogger, format } = require('winston');
const morgan = require('morgan');
const config = require('../config');

const httpTransport = [];
const loggerTransport = [];
const exceptionHandlerTransport = [];


if (config.get('logger.enableFileTransport')) {
  httpTransport.push(new transports.File({
    filename: config.get('logger.httpLogFileName'),
    json: true,
    maxsize: config.get('logger.logFileSize'),
    maxFiles: 5,
    colorize: false,
  }));

  loggerTransport.push(new transports.File({
    filename: config.get('logger.logFileName'),
    json: true,
    maxsize: config.get('logger.logFileSize'),
    colorize: false,
  }));

  exceptionHandlerTransport.push(new transports.File({
    filename: config.get('logger.exceptionLogFileName'),
    json: true,
    maxsize: config.get('logger.logFileSize'),
    colorize: false,
  }));
}

if (config.get('logger.enableConsoleTransport')) {
  httpTransport.push(new transports.Console({
    format: format.combine(
      format.colorize(),
      format.simple(),
    ),
  }));

  loggerTransport.push(new transports.Console({
    format: format.combine(
      format.colorize(),
      format.simple(),
    ),
  }));

  exceptionHandlerTransport.push(new transports.Console({
    format: format.combine(
      format.colorize(),
      format.simple(),
    ),
  }));
}

// winston.emitErrs = true;

// created separate httpLogger because we want to log express request separatly
const httpLogger = createLogger({
  transports: httpTransport,
  exitOnError: true,
});

// logger to log all other logs type from application to exception
const logger = createLogger({
  transports: loggerTransport,
  exceptionHandlers: exceptionHandlerTransport,
  exitOnError: true,
});

// appender function to use winston file transport
const stream = {
  write(message) {
    httpLogger.info(message);
  },
};

// morgan is used to capture http log
morgan.format('full', config.get('logger.httpLogFormat'));
// wrapper function act as middleware for express
logger.startHttpLogger = () => morgan('full', { stream });

module.exports = logger;
