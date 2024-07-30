const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    task: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
    group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
    content: String,
    files: [String],
    audio: String,
    createdAt: { type: Date, default: Date.now }
});


const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
