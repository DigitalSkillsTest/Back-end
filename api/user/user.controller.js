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
        message: 'result',
        data,
      });
    } catch (error) {
      logger.error(error);
      res.status(500).send({ success: false, message: 'Internal server error' });
    }
  },
  async findByUserId(req, res) {
    try {
      const { id } = req.params;
      const data = await userService.findById(id);
      const response = {
        success: true, message: 'record find', data,
      };
      res.status(200).send(response);
    } catch (error) {
      logger.error(error);
      res.status(500).send({ success: false, message: 'Internal server error' });
    }
  },
};

module.exports = controller;
