const mongoose = require('mongoose');
const User = require('./user.model');

/** all question service */
const service = {
  registerUser(newUser) {
    const user = new User(newUser);
    return user.save();
  },
  findByEmail(mail) {
    return User.findOne({ mail });
  },
  findById(id) {
    return User.findById({ _id: mongoose.Types.ObjectId(id) });
  },

};

module.exports = service;
