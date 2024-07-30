// models/topic.js
const mongoose = require('mongoose');

// Định nghĩa schema cho chủ đề
const topicSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    // Tham chiếu đến bảng task
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]
});

const Topic = mongoose.model('Topic', topicSchema);

module.exports = Topic;
