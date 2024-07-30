// models/Question.js
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    answers: [{ type: String, required: true }], // Mảng các đáp án
    correctAnswer: { type: String, required: true },
    points: { type: Number, required: true }, // Số điểm trả lời đúng cho câu hỏi
    requiresComment: { type: Boolean, required: true, default: false },// Yêu cầu comment từ user
    taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true }
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
