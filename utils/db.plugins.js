const mongoose = require('mongoose');

const createdOn = (schema) => {
  schema.add({ createdOn: { type: Date, default: new Date() } });
};
const updatedOn = (schema) => {
  schema.add({ updatedOn: { type: Date, default: new Date() } });
  // This rule is disabled because mongoose 4.X is not compatible with
  // fat arrow function and resolution of "this" variable
  // eslint-disable-next-line func-names
  schema.pre('findOneAndUpdate', function (next) {
    this.options.runValidators = true;
    this.update({}, { updatedOn: new Date() });
    next();
  });
};
const isDeleted = (schema) => {
  schema.add({ isDeleted: { type: Boolean, default: false } });
};

const registerGlobalPlugins = () => {
  mongoose.plugin(createdOn);
  mongoose.plugin(updatedOn);
  mongoose.plugin(isDeleted);
};

// Global plugin needs to be registered before any mongoose model are added
registerGlobalPlugins();

module.exports = {
  registerGlobalPlugins,
};
