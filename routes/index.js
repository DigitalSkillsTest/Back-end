const express = require('express');
const path = require('path');
const { questionRoutes } = require('../api/question');
const { userRoutes } = require('../api/user');

const addPath = (app, __dirname) => {
  app.get('/', (req, res) => res.send('logica running...'));
  app.use('/public', express.static(path.join(__dirname, 'public/uploads')));

  app.use('/user', userRoutes);
  app.use('/question', questionRoutes);
};

const initialize = (app, __dirname) => {
  app.get('/', (req, res) => res.send('logica running...'));
  app.use('/public', express.static(path.join(__dirname, 'public/uploads')));

  app.use('/user', userRoutes);
  app.use('/question', questionRoutes);
};

module.exports = {
  initialize,
};
