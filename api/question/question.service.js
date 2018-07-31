const mongoose = require('mongoose');
const Question = require('./question.model');

/** all question service */
const service = {
  addQuestion(newQuestion) {
    const question = new Question(newQuestion);
    return question.save();
  },
  addMultipleQuestion(newQuestionList) {
    return Question.insertMany(newQuestionList);
  },
  getAllQuestion() {
    return Question.find();
  },
  findQuestionByIsShow() {
    return Question.find({ isShow: true });
  },
  deleteQuestion(id) {
    return Question.findOneAndRemove({ _id: mongoose.Types.ObjectId(id) });
  },
  getQuestionById(id) {
    return Question.findById({ _id: mongoose.Types.ObjectId(id) });
  },
};
module.exports = service;
