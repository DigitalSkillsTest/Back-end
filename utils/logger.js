const winston = require('winston');
const morgan = require('morgan');
const config = require('../config');

const httpTransport = [];
const loggerTransport = [];
const exceptionHandlerTransport = [];

if (config.get('logger.enableFileTransport')) {
  httpTransport.push(new winston.transports.File({
    filename: config.get('logger.httpLogFileName'),
    json: true,
    maxsize: config.get('logger.logFileSize'),
    maxFiles: 5,
    colorize: false,
  }));

  loggerTransport.push(new winston.transports.File({
    filename: config.get('logger.logFileName'),
    json: true,
    maxsize: config.get('logger.logFileSize'),
    colorize: false,
  }));

  exceptionHandlerTransport.push(new winston.transports.File({
    filename: config.get('logger.exceptionLogFileName'),
    json: true,
    maxsize: config.get('logger.logFileSize'),
    colorize: false,
  }));
}

if (config.get('logger.enableConsoleTransport')) {
  httpTransport.push(new winston.transports.Console({
    json: false,
    colorize: true,
  }));

  loggerTransport.push(new winston.transports.Console({
    json: false,
    colorize: true,
  }));

  exceptionHandlerTransport.push(new winston.transports.Console({
    json: false,
    colorize: true,
  }));
}

winston.emitErrs = true;

// created separate httpLogger because we want to log express request separatly
const httpLogger = new winston.Logger({
  transports: httpTransport,
  exitOnError: true,
});

// logger to log all other logs type from application to exception
const logger = new winston.Logger({
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
