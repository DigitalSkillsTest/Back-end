// const moment = require('moment');
const { logger } = require('../../utils');
const { questionService } = require('../question');
const examService = require('./exam.service');
const categories = require('../../json/category.json');
const subCategories = require('../../json/subcategory.json');

// exam controller
const controller = {
  async startTest(req, res) {
    try {
      const questionList = await questionService.getQuestionsListForExam();
      const questions = questionList.sort((a, b) => {
        if (a.question_Cod > b.question_Cod) {
          return 1;
        } if (a.question_Cod < b.question_Cod) {
          return -1;
        }
        return 0;
      });
      const body = { userId: req.userId, questions };
      const examSession = await examService.createExam(body);
      const data = { examId: examSession._id };
      res.status(200).send({ success: true, message: 'success', data });
    } catch (error) {
      logger.error(error);
      res.status(500).send({ success: false, message: 'Internal server error' });
    }
  },
  async getExamInfo(req, res) {
    try {
      const { examId } = req.params;
      const data = await examService.findExamById(examId);
      res.status(200).send({ success: true, message: 'result', data });
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
        // const examStartTime = moment(examSession.createdOn);
        // const examLastUpdate = moment(examSession.updatedOn);
        // const diff = moment.duration(examLastUpdate.diff(examStartTime)).asMinutes();
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
  async calculateOverAllScore(req, res) {
    try {
      const { examId } = req.body;
      const groupScores = await examService.GroupByCatAndFindAvg(examId);
      const data = [];
      if (groupScores.length > 0) {
        groupScores.map(groupScore => categories.forEach((category) => {
          if (category.categories_COD === groupScore._id && groupScore.averageScore) {
            const result = category.scores.find(score => groupScore.averageScore <= score.isScore);
            result.isScore = groupScore.averageScore;
            result.categories_COD = category.categories_COD;
            data.push(result);
          }
        }));
      }
      res.status(200).send({ success: true, message: 'Overall Score', data });
    } catch (error) {
      res.status(500).send({ success: false, message: 'Internal server error' });
      logger.log(error.message);
    }
  },
  async calculateSubCategoryScore(req, res) {
    try {
      const { examId } = req.body;
      const categoryScores = await examService.GroupBySubCatAndFindAvg(examId);
      const data = [];
      if (categoryScores.length > 0) {
        categoryScores.map(categoryScore => subCategories.forEach((category) => {
          if (category.topic_Cod === categoryScore._id && categoryScore.averageScore) {
            const result = category.scores.find(score => categoryScore.averageScore <= score.isScore);
            result.isScore = categoryScore.averageScore;
            result.categories_COD = category.categories_COD;
            result.topic_Cod = category.topic_Cod;
            data.push(result);
          }
        }));
      }

      res.status(200).send({ success: true, message: 'Category Score', data });
    } catch (error) {
      res.status(500).send({ success: false, message: 'Internal server error' });
      logger.log(error.message);
    }
  },

};

module.exports = controller;
