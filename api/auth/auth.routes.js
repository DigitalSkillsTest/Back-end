const router = require('express').Router();
const controller = require('./auth.controller');
const validator = require('./auth.validator');

router.post('/register', [...validator.validateSignup, validator.customValidator], controller.signUp);

module.exports = router;
