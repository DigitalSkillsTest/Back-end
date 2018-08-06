const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');
const passportJWT = require('passport-jwt');
const { logger } = require('../utils');
const { User } = require('../api/user');

const { ExtractJwt } = passportJWT;
const JwtStrategy = passportJWT.Strategy;

const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

// To-do read it from config file
jwtOptions.secretOrKey = 'ashutec2017';

const createToken = (user) => {
  const payload = { id: user.id };
  const token = jwt.sign(payload, jwtOptions.secretOrKey);
  const data = {
    token,
    id: user.id,
    name: user.name,
    lastName: user.lastName,
    mail: user.mail,
    company: user.company,
    position: user.position,
    age: user.age,
    gender: user.gender,
  };
  const response = {
    success: true, message: 'success', data,
  };
  return response;
};

const verifyJWTHeader = () => (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (error, user) => {
    if (!user) { res.status(500).send('There is problem with your request'); } else {
      req.userName = user.email;
      req.userId = user._id;
      next();
    }
  })(req, res, next);
};

const initialize = (app) => {
  // initialize passport middleware
  app.use(passport.initialize());
};


const localSignUp = new LocalStrategy({
  usernameField: 'mail',
  passwordField: 'gender',
  passReqToCallback: true,
}, async (req, mail, gender, next) => {
  try {
    const user = await User.findOne({ mail }).exec();
    if (user) {
      next(null, createToken(user));
    } else {
      const newUser = new User({ ...req.body });
      const data = await newUser.save();
      next(null, createToken(data));
    }
  } catch (error) {
    const response = { success: false, title: 'error', message: 'Internal server error' };
    next(null, response);
    logger.error(error);
  }
});

const localJWT = new JwtStrategy(jwtOptions, (jwtPayload, next) => {
  User.findOne({ _id: jwtPayload.id }, (err, user) => {
    if (user) {
      next(null, user);
    } else {
      next(null, false);
    }
  });
});


passport.use('local-signUp', localSignUp);

passport.use('jwt', localJWT);

passport.serializeUser((user, next) => {
  next(null, user.id);
});

module.exports = {
  initialize,
  verifyJWTHeader,
};
