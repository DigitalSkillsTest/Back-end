const router = require('express').Router();
const controller = require('./user.controller');

/** all router for question controller */
router.get('/:id', controller.findByUserId);
router.post('/find', controller.findRegisterUser);

module.exports = router;
