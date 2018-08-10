const router = require('express').Router();
const controller = require('./exam.controller');

/** all router for exam controller */
router.get('/start', controller.startTest);
router.post('/next', controller.nextQuestion);
router.post('/answer', controller.saveAnswer);


module.exports = router;
