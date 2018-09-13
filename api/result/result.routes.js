const router = require('express').Router();
const controller = require('./result.controller');
const { fileUpload } = require('../../middlewares');

/** all router for result controller */
router.post('/email', fileUpload.single('file'), controller.sendResultInEmail);


module.exports = router;
