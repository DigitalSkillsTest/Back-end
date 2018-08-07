const { logger } = require('../../utils');
const questionService = require('./question.service');

// question controller
const controller = {

  // add simple type one question
  async addQuestion(req, res) {
    try {
      const question = { ...req.body };
      const data = await questionService.addQuestion(question);
      res.status(200).send({ success: true, message: 'record Insert', data });
    } catch (error) {
      logger.error(error);
      res.status(500).send({ success: false, message: 'Internal server error' });
    }
  },
  // add simple type multiple question
  async addMultipleQuestions(req, res) {
    try {
      const questions = req.body.map((question) => {
        let _question = {};
        _question = {
          ...question,
          createdBy: 'admin',
          updatedBy: 'admin',
        };
        return _question;
      });

      const data = await questionService.addMultipleQuestion(questions);
      res.status(200).send({ success: true, message: 'record Insert', data });
    } catch (error) {
      logger.error(error);
      res.status(500).send({ success: false, message: 'Internal server error' });
    }
  },
  // update question
  async updateQuestion(req, res) {
    try {
      const { id } = req.params;
      const body = { ...req.body };
      const data = await questionService.updateQuestion(id, body);
      res.status(200).send({ success: true, message: 'record update', data });
    } catch (error) {
      logger.error(error);
      res.status(500).send({ success: false, message: 'Internal server error' });
    }
  },
  // get question detail by id
  async getQuestionById(req, res) {
    try {
      const { id } = req.params;
      const data = await questionService.getQuestionById(id);
      res.status(200).send({ success: true, message: 'record found', data });
    } catch (error) {
      logger.error(error);
      res.status(500).send({ success: false, message: 'Internal server error' });
    }
  },
  // get list of question
  async getQuestionsList(req, res) {
    try {
      const data = await questionService.getAllQuestion();
      res.status(200).send({ success: true, message: 'question list', data });
    } catch (error) {
      logger.error(error);
      res.status(500).send({ success: false, message: 'Internal server error' });
    }
  },
  // delete question
  async deleteQuestion(req, res) {
    try {
      const { id } = req.params;
      await questionService.deleteQuestion(id);
      res.status(200).send({ success: true, message: 'record Deleted' });
    } catch (error) {
      logger.error(error);
      res.status(500).send({ success: false, message: 'Internal server error' });
    }
  },


};

module.exports = controller;
