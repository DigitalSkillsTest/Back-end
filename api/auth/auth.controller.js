const passport = require('passport');

const controller = {
  signUp(req, res, next) {
    passport.authenticate('local-signUp', (err, user) => {
      res.send(user);
    })(req, res, next);
  },

};
module.exports = controller;
