const router = require('express').Router();

const controller = require('./question.controller');

/** all router for question controller */
router.get('/', controller.getQuestionsList);
router.get('/:id', controller.getQuestionById);
router.post('/', controller.addQuestion);
router.post('/:id', controller.updateQuestion);
router.post('/bulk', controller.addMultipleQuestions);
router.delete('/:id', controller.deleteQuestion);

module.exports = router;
