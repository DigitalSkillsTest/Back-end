const mongoose = require('mongoose');
const Exam = require('./exam.model');

/** all exam service */
const service = {
  createExam(body) {
    return Exam.create(body);
  },
  findExamById(docId) {
    return Exam.findById(
      { _id: mongoose.Types.ObjectId(docId) },
      {
        'questions.isDeleted': 0,
        'questions.createdOn': 0,
        'questions.updatedOn': 0,
        'questions.options.isDeleted': 0,
        'questions.options.createdOn': 0,
        'questions.options.updatedOn': 0,
      },
    ).exec();
  },
  findExamIdAndSaveScore(docId, questionId, score, code) {
    return Exam.findOneAndUpdate(
      {
        _id: mongoose.Types.ObjectId(docId),
        'questions._id': mongoose.Types.ObjectId(questionId),
      },
      {
        $set: {
          'questions.$.isAttempted': true,
          'questions.$.userScore': score,
          'questions.$.userCode': code,
        },
      },
      { new: true },
    ).exec();
  },
  GroupByCatAndFindAvg(docId) {
    return Exam.aggregate([
      { $unwind: '$questions' },
      { $match: { _id: mongoose.Types.ObjectId(docId) } },
      {
        $group: {
          _id: '$questions.categories_COD',
          averageScore: { $avg: ('$questions.userScore' || 0) },
        },
      },
    ]).exec();
  },
  GroupBySubCatAndFindAvg(docId) {
    return Exam.aggregate([
      { $unwind: '$questions' },
      { $match: { _id: mongoose.Types.ObjectId(docId) } },
      {
        $group: {
          _id: '$questions.topic_Cod',
          averageScore: { $avg: ('$questions.userScore' || 0) },
        },
      },
    ]).exec();
  },
};

module.exports = service;
