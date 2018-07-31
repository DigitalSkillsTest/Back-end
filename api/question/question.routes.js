const router = require('express').Router();

const controller = require('./question.controller');
const { fileUpload } = require('../../middlewares');

/** all router for question controller */
router.get('/', controller.getQuestionsList);
router.get('/create', controller.createEnquiryForm);
router.get('/:id', controller.getQuestionById);

router.post('/', controller.addQuestion);
// router.post('/', controller.addMultipleQuestions);
router.post('/upload', fileUpload.fields([{ name: 'optionImage', maxCount: 10 }]), controller.addQuestionWithImage);
router.delete('/:id', controller.deleteQuestion);

module.exports = router;
