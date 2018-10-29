const { check, validationResult } = require('express-validator/check');

const validator = {
  customValidator: (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
  validateAddQuestion: [
    check('categories_COD')
      .exists().withMessage('categories_COD is required'),
    check('category')
      .exists()
      .withMessage('category is required!'),
    check('topic_Cod')
      .exists()
      .withMessage('topic_Cod is required!'),
    check('subCat')
      .exists()
      .withMessage('subCat is required!'),
    check('question_Cod')
      .exists()
      .withMessage('question_Cod is required!'),
    check('question')
      .exists()
      .withMessage('question is required!'),
    check('options')
      .exists()
      .withMessage('options is required!')
      .isArray()
      .withMessage('options is Array'),
    check('options.*.answer')
      .exists()
      .withMessage('options answer is required!'),
    check('options.*.code')
      .exists()
      .withMessage('options code is required!'),
    check('options.*.score')
      .exists()
      .withMessage('options score is required!')
      .isNumeric()
      .withMessage('score must be a number'),
  ],
  validateUpdateQuestion: [
    check('categories_COD')
      .exists().withMessage('categories_COD is required'),
    check('category')
      .exists()
      .withMessage('category is required!'),
    check('topic_Cod')
      .exists()
      .withMessage('topic_Cod is required!'),
    check('subCat')
      .exists()
      .withMessage('subCat is required!'),
    check('question_Cod')
      .exists()
      .withMessage('question_Cod is required!'),
    check('question')
      .exists()
      .withMessage('question is required!'),
    check('options')
      .exists()
      .withMessage('options is required!')
      .isArray()
      .withMessage('options is Array'),
    check('options.*.answer')
      .exists()
      .withMessage('options answer is required!'),
    check('options.*.code')
      .exists()
      .withMessage('options code is required!'),
    check('options.*.score')
      .exists()
      .withMessage('options score is required!')
      .isNumeric()
      .withMessage('score must be a number'),
    check('options.*._id')
      .exists()
      .withMessage('options score is required!')
      .isMongoId()
      .withMessage('Invalid score Id'),
  ],
};

module.exports = validator;
