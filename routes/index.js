const router = require('express').Router();
const { questionRoutes } = require('../api/question');
const { userRoutes } = require('../api/user');
const { authRoutes } = require('../api/auth');
const passport = require('../middlewares/passport');

const routes = () => {
  router.get('/', (req, res) => res.send('api server start'));
  router.use('/user', userRoutes);
  router.use('/question', questionRoutes);
  return router;
};


const initialize = (app) => {
  app.get('/', (req, res) => res.send('server running...'));

  // only authentication route allowed without JWT authentication header
  app.use('/api/auth', authRoutes);

  // All other router down below require JWT authentication in header, This middelware verify it
  // when successful allow other routes to execute
  app.use(passport.verifyJWTHeader());

  app.use('/api', routes());
};

module.exports = {
  initialize,
};
