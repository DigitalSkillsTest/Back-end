const { check, validationResult } = require('express-validator/check');

const validator = {
  customValidator: (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
  validateSignup: [
    check('name')
      .exists().withMessage('name is required'),
    check('lastName')
      .exists()
      .withMessage('lastName is required!'),
    check('mail')
      .exists()
      .withMessage('mail is required!')
      .isEmail()
      .withMessage('invalid mail address'),
    check('company')
      .exists()
      .withMessage('company is required!'),
    check('position')
      .exists()
      .withMessage('position is required!'),
    check('age')
      .exists()
      .withMessage('age is required!')
      .isNumeric()
      .withMessage('age must be a number'),
    check('gender')
      .exists()
      .withMessage('gender is required!'),
  ],
};

module.exports = validator;
