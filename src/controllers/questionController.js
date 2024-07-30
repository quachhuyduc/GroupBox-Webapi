// controllers/questionController.js
const Question = require('../models/question');
const questionService = require('../services/QuestionService');
const createQuestion = async (req, res) => {
    try {
        const { question, answers, correctAnswer, points, requiresComment, taskId } = req.body;

        const newQuestion = new Question({
            question,
            answers,
            correctAnswer,
            points,
            requiresComment,
            taskId
        });

        const savedQuestion = await newQuestion.save();
        res.status(201).json(savedQuestion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getQuestionList = async (req, res) => {
    try {
        const questions = await questionService.getAllQuestion();
        res.status(200).json(questions);
    } catch (error) {
        console.error('Error fetching question:', error.message);
        res.status(500).json({ status: 'ERR', message: 'Failed to fetch question' });
    }
};

const deleteQuestion = async (req, res) => {
    const { questionId } = req.params;

    try {
        const result = await Question.findByIdAndDelete(questionId);

        if (!result) {
            return res.status(404).json({ status: 'Error', message: 'Question not found' });
        }

        res.json({ status: 'OK', message: 'Question deleted successfully' });
    } catch (error) {
        console.error('Error deleting question:', error);
        res.status(500).json({ status: 'Error', message: 'Error deleting question' });
    }
};
module.exports = {
    createQuestion,
    deleteQuestion,
    getQuestionList
};
