const { logger } = require('../../utils');
const userService = require('./user.service');

// user controller

const controller = {
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
