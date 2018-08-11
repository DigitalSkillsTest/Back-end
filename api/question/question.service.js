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
    return Question.find({ isDeleted: false });
  },
  getQuestionsListForExam() {
    return Question.find(
      { isDeleted: false },
      {
        isDeleted: 0,
        createdOn: 0,
        updatedOn: 0,
        'options.isDeleted': 0,
        'options.createdOn': 0,
        'options.updatedOn': 0,
      },
    ).exec();
  },
  updateQuestion(docId, body) {
    const id = docId;
    return Question.findByIdAndUpdate(id, { $set: body }, { new: true }).exec();
  },
  deleteQuestion(docId) {
    const id = docId;
    return Question.findByIdAndUpdate(id, { $set: { isDeleted: true } }, { new: true }).exec();
  },
  getQuestionById(docId) {
    return Question.find({ _id: mongoose.Types.ObjectId(docId), isDeleted: false });
  },
};
module.exports = service;
