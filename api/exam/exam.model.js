const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'user' },
  examStatus: { type: String, default: 'start' },
  questions: [{
    questionId: { type: Schema.Types.ObjectId, ref: 'question' },
    isAttempted: { type: Boolean, default: false },
    userChoice: { type: String },
  }],
});
module.exports = mongoose.model('exam', schema);
