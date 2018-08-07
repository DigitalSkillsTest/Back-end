const { logger } = require('../../utils');
const { questionService } = require('../question');
const examService = require('./exam.service');

// exam controller
const controller = {
  async startTest(req, res) {
    try {
      const questionList = await questionService.getQuestionsID();
      const questions = questionList.map(question => ({ questionId: question._id }));
      const body = { userId: req.userId, questions };
      const createExam = await examService.createExam(body);
      const newQuestionList = await examService.getQuestion(createExam._id);
      const data = newQuestionList.questions[0].questionId;
      res.status(200).send({ success: true, message: 'exam start', data });
    } catch (error) {
      logger.error(error);
      res.status(500).send({ success: false, message: 'Internal server error' });
    }
  },
};

module.exports = controller;
