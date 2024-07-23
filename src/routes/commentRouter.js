const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router.post('/addComments', commentController.createComment);
router.get('/task/:taskId', commentController.getCommentsByTaskId);

module.exports = router;
