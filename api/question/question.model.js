const mongoose = require('mongoose');

const { Schema } = mongoose;

const option = new Schema({
  answer: { type: String },
  code: { type: String },
  score: { type: Number },
});

const schema = new Schema({
  categories_COD: { type: String },
  category: { type: String },
  topic_Cod: { type: String },
  subCat: { type: String },
  question_Cod: { type: String },
  question: { type: String },
  options: [option],
});
module.exports = mongoose.model('question', schema);
