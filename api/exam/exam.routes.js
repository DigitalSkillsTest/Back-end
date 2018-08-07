const router = require('express').Router();
const controller = require('./exam.controller');

/** all router for exam controller */
router.get('/start', controller.startTest);


module.exports = router;
