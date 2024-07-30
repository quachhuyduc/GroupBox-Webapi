const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router.post('/addComments', commentController.createComment);
router.get('/task/:taskId', commentController.getCommentsByTaskId);
router.get('/group/:groupId', commentController.getCommentsByGroupId);
router.get('/listComments', commentController.getCommentList);
router.delete('/delete-comment/:id', commentController.deleteComment);
router.put('/update-comment/:id', commentController.updateComment);
module.exports = router;
