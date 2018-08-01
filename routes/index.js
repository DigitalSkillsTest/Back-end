// const express = require('express');
// const path = require('path');
const { questionRoutes } = require('../api/question');
const { userRoutes } = require('../api/user');


const initialize = (app) => {
  app.get('/', (req, res) => res.send('logica running...'));
  // app.use('/public', express.static(path.join(__dirname, 'public/uploads'))); //  __dirname

  app.use('/user', userRoutes);
  app.use('/question', questionRoutes);
};

module.exports = {
  initialize,
};
