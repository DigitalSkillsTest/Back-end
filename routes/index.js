const path = require('path');
const router = require('express').Router();

const config = require('../config');
const { questionRoutes } = require('../api/question');
const { userRoutes } = require('../api/user');
const { authRoutes } = require('../api/auth');
const { examRoutes } = require('../api/exam');
const { resultRoutes } = require('../api/result');
const passport = require('../middlewares/passport');

const routes = () => {
  router.get('/', (req, res) => res.send('api server start'));
  router.use('/user', userRoutes);
  router.use('/question', questionRoutes);
  router.use('/exam', examRoutes);
  router.use('/result', resultRoutes);
  return router;
};


const initialize = (app, root) => {
  // only authentication route allowed without JWT authentication header
  app.use('/api/auth', authRoutes);

  // All other router down below require JWT authentication in header, This middelware verify it
  // when successful allow other routes to execute
  app.use('/api', passport.verifyJWTHeader(), routes());

  app.use('*', (req, res) => {
    res.status(200).sendFile(path.join(root, config.get('server.static.directory'), 'index.html'));
  });
};

module.exports = {
  initialize,
};
