const mongoose = require('mongoose');

const { Schema } = mongoose;

const option = new Schema({
  answer: { type: String },
  code: { type: String },
  score: { type: String },
});

const question = new Schema({
  categories_COD: { type: String },
  category: { type: String },
  topic_Cod: { type: String },
  subCat: { type: String },
  question_Cod: { type: String },
  question: { type: String },
  options: [option],
  isAttempted: { type: Boolean, default: false },
  userScore: { type: String },
  userCode: { type: String },
});


const schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'user' },
  examStatus: { type: String, default: 'start' },
  questions: [question],
});

module.exports = mongoose.model('exam', schema);
