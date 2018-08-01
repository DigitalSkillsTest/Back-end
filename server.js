// Import required external node modules
const http = require('http');
const express = require('express');
const config = require('./config');
// destructuring logger from exported object
const { logger, db } = require('./utils');
const middlewares = require('./middlewares');
const routes = require('./routes');

const app = express();
// set port and ipv4/ipv6 address
app.set('port', config.get('server.port'));
app.set('ipAddress', config.get('server.addressFamily'));

// required to get client IP when running via reverse proxy (HA proxy)
app.set('trust proxy', true);

// connect with DB
db.initialize();
// setup middlewares
middlewares.initialize(app, __dirname);

// setup routes
routes.initialize(app);

// start http server
http.createServer(app).listen(app.get('port'), app.get('ipAddress'), () => {
  logger.info(`api server with pid:${process.pid} listening on port:${app.get('port')}`);
  logger.info(`Environment:${config.get('env')}`);
});
