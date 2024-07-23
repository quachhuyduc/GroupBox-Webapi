const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    answers: [{ type: String, required: true }], // Mảng các đáp án
    correctAnswer: { type: String, required: true },
    points: { type: Number, required: true }, // Số điểm trả lời đúng cho câu hỏi
    // Độ khó của câu hỏi
    requiresComment: { type: Boolean, required: true, default: false } // Yêu cầu comment từ user
});

const taskSchema = new mongoose.Schema({
    nameTask: { type: String, required: true }, // Tên nhiệm vụ
    contentTask: { type: String, required: true }, // Nội dung nhiệm vụ
    requirements: { type: String, required: true }, // Yêu cầu của nhiệm vụ
    questions: [questionSchema], // Mảng các câu hỏi trong nhiệm vụ
    totalPoints: { type: Number, required: true },
    difficulty: { type: String, required: true }, // Tổng số điểm có thể kiếm được của nhiệm vụ
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
