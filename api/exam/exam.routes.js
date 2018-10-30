const router = require('express').Router();
const controller = require('./exam.controller');
const validator = require('./exam.validator');


/** all router for exam controller */
router.get('/start', controller.startTest);
router.post('/next', [...validator.nextQuestion, validator.customValidator], controller.nextQuestion);
router.post('/answer', [...validator.saveAnswer, validator.customValidator], controller.saveAnswer);
router.post('/result/all', [...validator.getResult, validator.customValidator], controller.calculateOverAllScore);
router.post('/result/category', [...validator.getResult, validator.customValidator], controller.calculateSubCategoryScore);
router.get('/:examId', [...validator.getResult, validator.customValidator], controller.getExamInfo);


module.exports = router;
