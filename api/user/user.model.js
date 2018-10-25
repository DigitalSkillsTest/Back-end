const mongoose = require('mongoose');

const schema = mongoose.Schema({
  name: String,
  lastName: String,
  mail: String,
  company: String,
  position: String,
  age: String,
  gender: String,
  createdBy: String,
  updatedBy: String,
});
module.exports = mongoose.model('user', schema);
