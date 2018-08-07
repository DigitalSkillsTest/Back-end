const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({
  categories_COD: { type: String },
  category: { type: String },
  topic_Cod: { type: String },
  subCat: { type: String },
  question_Cod: { type: String },
  question: { type: String },
  options: [{
    answer: { type: String },
    code: { type: String },
    score: { type: String },

  }],
});
module.exports = mongoose.model('question', schema);
