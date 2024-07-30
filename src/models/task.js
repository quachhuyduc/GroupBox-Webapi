// models/Task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    nameTask: { type: String, required: true }, // Tên nhiệm vụ
    contentTask: { type: String, required: true }, // Nội dung nhiệm vụ
    requirements: { type: String, required: true }, // Yêu cầu của nhiệm vụ
    totalPoints: { type: Number, required: true },
    difficulty: { type: String, required: true },
    category: { type: String, required: true } // Category field
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
