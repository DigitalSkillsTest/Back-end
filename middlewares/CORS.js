const cors = require('cors');
const config = require('../config');

module.exports = (app) => {
  const options = {
    origin: config.get('server.CORS.allowedHosts'),
    methods: config.get('server.CORS.allowedMethods'),
    allowedHeaders: config.get('server.CORS.allowedHeaders'),
    exposedHeaders: config.get('server.CORS.exposedHeaders'),
    credentials: config.get('server.CORS.credentials'),
    preflightContinue: config.get('server.CORS.preflightContinue'),
    optionsSuccessStatus: config.get('server.CORS.optionsSuccessStatus'),
  };
  // enable options pre flight for method other than Get/Post/Head
  app.options('*', cors(options));
  app.use(cors(options));
};
