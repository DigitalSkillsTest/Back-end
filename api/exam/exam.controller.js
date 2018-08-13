const { logger } = require('../../utils');
const { questionService } = require('../question');
const examService = require('./exam.service');

// exam controller
const controller = {
  async startTest(req, res) {
    try {
      const questionList = await questionService.getQuestionsListForExam();
      const questions = questionList.map(question => question._doc);
      const body = { userId: req.userId, questions };
      const examSession = await examService.createExam(body);
      const data = { examId: examSession._id };
      res.status(200).send({ success: true, message: 'success', data });
    } catch (error) {
      logger.error(error);
      res.status(500).send({ success: false, message: 'Internal server error' });
    }
  },
  async nextQuestion(req, res) {
    try {
      const { examId, QIndex } = req.body;
      const questionNumber = parseInt(QIndex, 0);
      const examSession = await examService.findExamById(examId);
      if (
        !examSession
        || Number.isNaN(questionNumber)
        || questionNumber < 1
        || examSession.questions.length < questionNumber) {
        res.status(200).send({ success: true, message: 'Invalid examId or QNumber' });
      } else {
        const data = {
          examId: examSession._id,
          question: examSession.questions[questionNumber - 1],
        };
        res.status(200).send({ success: true, message: 'success', data });
      }
    } catch (error) {
      logger.error(error);
      res.status(500).send({ success: false, message: 'Internal server error' });
    }
  },
  async saveAnswer(req, res) {
    try {
      const {
        examId, questionId, userScore, userCode,
      } = req.body;
      const result = await examService.findExamIdAndSaveScore(examId, questionId, userScore, userCode);
      if (!result) {
        res.status(200).send({ success: false, message: 'Invalid examId or questionId' });
      }
      res.status(200).send({ success: true, message: 'success' });
    } catch (error) {
      logger.error(error);
      res.status(500).send({ success: false, message: 'Internal server error' });
    }
  },
};

module.exports = controller;
