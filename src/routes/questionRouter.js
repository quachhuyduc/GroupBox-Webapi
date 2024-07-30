// routes/questionRoutes.js
const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

router.post('/create-question', questionController.createQuestion);
router.delete('/:questionId', questionController.deleteQuestion);
router.get('/listQuestion', questionController.getQuestionList);
router.delete('/delete-question/:questionId', questionController.deleteQuestion);
module.exports = router;
