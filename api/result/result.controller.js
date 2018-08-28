const { logger } = require('../../utils');


const controller = {
  finalResult(req, res) {
    try {
      res.status(200).send({ success: true, message: 'result' });
    } catch (error) {
      logger.error(error);
      res.status(500).send({ success: false, message: 'Internal server error' });
    }
  },
};

module.exports = controller;
