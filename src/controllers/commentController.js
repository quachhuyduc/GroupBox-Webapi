const commentService = require('../services/commentService');

const createComment = async (req, res) => {
    try {
        const newComment = await commentService.createComment(req.body);
        console.log('Comment created:', newComment);
        res.status(201).json({ status: 'OK', data: newComment });
    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).json({ status: 'ERROR', message: error.message });
    }
};

const getCommentsByTaskId = async (req, res) => {
    try {
        const comments = await commentService.getCommentsByTaskId(req.params.taskId);
        console.log('Comments retrieved:', comments);
        res.status(200).json(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ error: error.message });
    }
};
const getCommentList = async (req, res) => {
    try {
        const comments = await commentService.getAllComment();
        res.status(200).json(comments);
    } catch (error) {
        console.error('Error fetching comments:', error.message);
        res.status(500).json({ status: 'ERR', message: 'Failed to fetch comments' });
    }
};
const getCommentsByGroupId = async (req, res) => {
    try {
        const comments = await commentService.getCommentsByGroupId(req.params.groupId);
        console.log('Comments retrieved:', comments);
        res.status(200).json(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ error: error.message });
    }
};
const deleteComment = async (req, res) => {
    try {
        const commentId = req.params.id;
        const result = await commentService.deleteComment(commentId);
        if (result) {
            res.status(200).json({ status: 'OK', message: 'Comment deleted successfully' });
        } else {
            res.status(404).json({ status: 'ERROR', message: 'Comment not found' });
        }
    } catch (error) {
        console.error('Error deleting comment:', error);
        res.status(500).json({ status: 'ERROR', message: 'Failed to delete comment' });
    }
};
const updateComment = async (req, res) => {
    try {
        const commentId = req.params.id;
        const updateData = req.body;
        const updatedComment = await commentService.updateComment(commentId, updateData);
        if (updatedComment) {
            res.status(200).json({ status: 'OK', data: updatedComment });
        } else {
            res.status(404).json({ status: 'ERROR', message: 'Comment not found' });
        }
    } catch (error) {
        console.error('Error updating comment:', error);
        res.status(500).json({ status: 'ERROR', message: 'Failed to update comment' });
    }
};

module.exports = {
    createComment,
    getCommentsByTaskId,
    getCommentList,
    getCommentsByGroupId,
    deleteComment,
    updateComment
};
