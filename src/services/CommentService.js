const Comment = require('../models/comment');

const createComment = async (commentData) => {
    try {
        const comment = new Comment(commentData); // Tạo bình luận mới
        const savedComment = await comment.save(); // Lưu bình luận vào cơ sở dữ liệu
        return savedComment;
    } catch (error) {
        console.error('Error creating comment:', error);
        throw new Error('Error creating comment');
    }
};
const updateComment = async (commentId, updateData) => {
    return await Comment.findByIdAndUpdate(commentId, updateData, { new: true });
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
const getCommentsByGroupId = async (groupId) => {
    try {
        const comments = await Comment.find({ group: groupId })
            .populate('user', 'name avatarUrl') // Lấy thông tin name và avatar từ user

        return comments;
    } catch (error) {
        console.error('Error retrieving comments from database:', error);
        throw new Error('Error retrieving comments from database');
    }
};
const getAllComment = async () => {
    try {
        const comments = await Comment.find({})
        return {
            status: 'OK',
            message: 'Comment fetched successfully',
            data: comments
        };
    } catch (error) {
        console.error('Error fetching Comment:', error);
        throw new Error('Error fetching Comment');
    }
};
const deleteComment = async (commentId) => {
    return await Comment.findByIdAndDelete(commentId);
};
module.exports = {
    createComment,
    getCommentsByTaskId,
    getAllComment,
    getCommentsByGroupId,
    deleteComment,
    updateComment
};
