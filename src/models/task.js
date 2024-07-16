const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    answers: [{ type: String, required: true }],  // Mảng các đáp án
    correctAnswer: { type: String, required: true },
    points: { type: Number, required: true },
});

const levelSchema = new mongoose.Schema({
    levelName: { type: String, required: true },
    requirements: { type: String, required: true },
    totalPoints: { type: Number, required: true }, // Tổng số điểm có thể kiếm được cho mức độ này
    questions: [questionSchema],
});

const taskSchema = new mongoose.Schema({
    nameTask: { type: String, required: true },
    contentTask: { type: String, required: true },
    levels: {
        easy: levelSchema,
        medium: levelSchema,
        hard: levelSchema,
    }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
