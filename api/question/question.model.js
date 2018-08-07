const mongoose = require('mongoose');

const schema = mongoose.Schema({
  question: String,
  answer: String,
  isShow: Boolean,
  inputType: String,
  isRequired: String,
  options: Array,
  createdBy: String,
  updatedBy: String,
});
module.exports = mongoose.model('Question', schema);
