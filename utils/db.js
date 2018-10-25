const mongoose = require('mongoose');
const config = require('../config');
const logger = require('./logger');

// Use native promises
mongoose.Promise = global.Promise;


const initialize = () => {
  mongoose.connect(config.get('database.host'), { useNewUrlParser: true })
    .then(() => {
      logger.info(`database connected on ${config.get('database.host')}`);
    })
    .catch((error) => {
      logger.error(`Error :${error}`);
      logger.info('not able to connect with mongoDB, existing process');
      // not able to connect with mongo DB existing process
      process.exit(0);
    });
};

module.exports = {
  initialize,
};
