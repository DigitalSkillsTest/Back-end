const { check, validationResult } = require('express-validator/check');

const validator = {
  customValidator: (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
  nextQuestion: [
    check('examId')
      .exists()
      .withMessage('examId is required!')
      .isMongoId()
      .withMessage('Invalid examId'),
    check('QIndex')
      .exists()
      .withMessage('QIndex is required!')
      .isNumeric()
      .withMessage('QIndex must be a number'),
  ],
  saveAnswer: [
    check('examId')
      .exists()
      .withMessage('examId is required!')
      .isMongoId()
      .withMessage('Invalid examId'),
    check('questionId')
      .exists()
      .withMessage('questionId is required!')
      .isMongoId()
      .withMessage('Invalid questionId'),
    check('userCode')
      .exists()
      .withMessage('userCode is required!'),
    check('userScore')
      .exists()
      .withMessage('QIndex is required!')
      .isNumeric()
      .withMessage('QIndex must be a number'),
    check('examStatus')
      .exists()
      .withMessage('examStatus is required!'),
  ],
  getResult: [
    check('examId')
      .exists()
      .withMessage('examId is required!')
      .isMongoId()
      .withMessage('Invalid examId'),
  ],

};

module.exports = validator;
