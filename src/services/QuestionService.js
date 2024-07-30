// services/QuestionService.js
const Question = require('../models/question');

const getAllQuestion = async () => {
    try {
        const questions = await Question.find({}).populate('taskId'); // Sử dụng populate để lấy dữ liệu Task
        return {
            status: 'OK',
            message: 'Questions fetched successfully',
            data: questions
        };
    } catch (error) {
        console.error('Error fetching questions:', error);
        throw new Error('Error fetching questions');
    }
};

module.exports = {
    getAllQuestion
};
