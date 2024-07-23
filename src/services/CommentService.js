const Comment = require('../models/comment');

const createComment = async (commentData) => {
    try {
        const comment = new Comment(commentData);
        const savedComment = await comment.save();
        return savedComment;
    } catch (error) {
        console.error('Error creating comment:', error);
        throw new Error('Error creating comment');
    }
};

const getCommentsByTaskId = async (taskId) => {
    try {
        const comments = await Comment.find({ task: taskId })
            .populate('user', 'name avatarUrl') // Lấy thông tin name và avatar từ user

        return comments;
    } catch (error) {
        console.error('Error retrieving comments from database:', error);
        throw new Error('Error retrieving comments from database');
    }
};

module.exports = {
    createComment,
    getCommentsByTaskId
};
