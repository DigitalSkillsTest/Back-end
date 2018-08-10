const mongoose = require('mongoose');
const Exam = require('./exam.model');

/** all exam service */
const service = {
  createExam(body) {
    return Exam.create(body);
  },
  findExamById(docId) {
    return Exam.findById({ _id: mongoose.Types.ObjectId(docId) }).exec();
  },
  findExamIdAndSaveScore(docId, questionId, score) {
    return Exam.findOne({ _id: mongoose.Types.ObjectId(docId) }).exec();
  },
};

module.exports = service;
