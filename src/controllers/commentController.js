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


module.exports = {
    createComment,
    getCommentsByTaskId,
    getCommentList
};
