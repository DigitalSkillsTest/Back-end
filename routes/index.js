const router = require('express').Router();
const { questionRoutes } = require('../api/question');
const { userRoutes } = require('../api/user');

const routes = () => {
  router.get('/', (req, res) => res.send('api server start'));
  router.use('/user', userRoutes);
  router.use('/question', questionRoutes);
  return router;
};


const initialize = (app) => {
  app.get('/', (req, res) => res.send('server running...'));
  app.use('/api', routes());
};

module.exports = {
  initialize,
};
