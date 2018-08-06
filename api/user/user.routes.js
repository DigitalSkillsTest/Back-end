const router = require('express').Router();
const controller = require('./user.controller');

/** all router for question controller */
router.post('/find', controller.findRegisterUser);

module.exports = router;
