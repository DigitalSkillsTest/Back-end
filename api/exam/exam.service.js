// const mongoose = require('mongoose');
const Exam = require('./exam.model');

/** all exam service */
const service = {
  createExam(body) {
    return Exam.create(body);
  },
  getQuestion(docId) {
    const id = docId;
    return Exam.findOne(id)
      .populate({ path: 'questions.questionId', match: { topic_Cod: 'A.1' } })
      .exec();
  },
};

module.exports = service;
