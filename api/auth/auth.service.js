const bcrypt = require('bcrypt');

const service = {

  generateHash: password => bcrypt.hashSync(password, bcrypt.genSaltSync(8), null),
  validPassword: (password, passwordHash) => bcrypt.compareSync(password, passwordHash),
};

module.exports = service;
