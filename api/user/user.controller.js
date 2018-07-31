const { logger } = require('../../utils');
const userService = require('./user.service');

// user controller

const controller = {
  async createUser(req, res) {
    try {
      const findUser = await userService.findByEmail(req.body.mail);
      if (findUser.length === 0) {
        const data = await userService.registerUser(req.body);
        res.status(200).send({
          success: true,
          title: 'success',
          message: 'user register done!',
          data,
        });
      } else {
        res.status(200).send({
          success: true,
          title: 'success',
          message: 'welcome again',
          data: findUser,
        });
      }
    } catch (error) {
      logger.error(error);
      res.status(500).send({ success: false, title: 'error', message: 'Internal server error' });
    }
  },
  async findRegisterUser(req, res) {
    try {
      const { mail } = req.body;
      const data = await userService.findByEmail(mail);
      res.status(200).send({
        success: true,
        title: 'success',
        message: 'result',
        data,
      });
    } catch (error) {
      logger.error(error);
      res.status(500).send({ success: false, title: 'error', message: 'Internal server error' });
    }
  },
};

module.exports = controller;
