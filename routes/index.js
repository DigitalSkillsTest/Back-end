const router = require('express').Router();
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


const initialize = (app) => {
  app.get('/', (req, res) => res.send('server running...'));

  // only authentication route allowed without JWT authentication header
  app.use('/api/auth', authRoutes);

  // All other router down below require JWT authentication in header, This middelware verify it
  // when successful allow other routes to execute
  app.use('/api', passport.verifyJWTHeader(), routes());
};

module.exports = {
  initialize,
};
