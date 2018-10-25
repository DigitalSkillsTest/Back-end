const router = require('express').Router();
const controller = require('./exam.controller');

/** all router for exam controller */
router.get('/start', controller.startTest);
router.post('/next', controller.nextQuestion);
router.post('/answer', controller.saveAnswer);
router.post('/result/all', controller.calculateOverAllScore);
router.post('/result/category', controller.calculateSubCategoryScore);
router.get('/:examId', controller.getExamInfo);


module.exports = router;
