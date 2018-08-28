const router = require('express').Router();
const controller = require('./result.controller');

/** all router for result controller */
router.post('/', controller.finalResult);


module.exports = router;
