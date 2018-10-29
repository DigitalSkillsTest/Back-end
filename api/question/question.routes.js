const router = require('express').Router();

const controller = require('./question.controller');
const validator = require('./question.validator');

/** all router for question controller */
router.get('/', controller.getQuestionsList);
router.get('/:id', controller.getQuestionById);
router.post('/', [...validator.validateAddQuestion, validator.customValidator], controller.addQuestion);
router.post('/:id', [...validator.validateUpdateQuestion, validator.customValidator], controller.updateQuestion);
router.post('/bulk', controller.addMultipleQuestions);
router.delete('/:id', controller.deleteQuestion);

module.exports = router;
