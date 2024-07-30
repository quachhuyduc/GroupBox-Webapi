// controllers/taskController.js
const Task = require('../models/task');
const User = require('../models/user');
const Question = require('../models/question');
const taskService = require('../services/TaskService');

const createTask = async (req, res) => {
    try {
        const { nameTask, contentTask, requirements, totalPoints, difficulty, category } = req.body;


        const newTask = new Task({
            nameTask,
            contentTask,
            requirements,
            totalPoints,
            difficulty,
            category,
        });

        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const updateTask = async (req, res) => {
    try {
        const taskId = req.params.taskId;
        const updates = req.body; // Lấy dữ liệu cập nhật từ body

        // Tìm nhiệm vụ theo ID và cập nhật
        const updatedTask = await Task.findByIdAndUpdate(taskId, updates, { new: true });

        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json(updatedTask);
    } catch (error) {
        console.error('Error updating task:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

const getTaskByName = async (req, res) => {
    try {
        const taskName = req.params.name;
        const task = await taskService.getTaskByName(taskName);
        if (!task) {
            return res.status(404).json({ status: 'ERROR', message: 'Task not found' });
        }
        res.status(200).json({ status: 'OK', data: task });
    } catch (error) {
        res.status(500).json({ status: 'ERROR', message: error.message });
    }
};

const getTaskById = async (req, res) => {
    try {
        const taskId = req.params.taskId; // Corrected variable name from 'userId' to 'taskId'
        const task = await taskService.getTaskById(taskId);
        if (!task || task.status === 'ERR') { // Check if task is not found or error status
            return res.status(404).json({ status: 'ERROR', message: 'Task not found' });
        }
        res.status(200).json({ status: 'OK', data: task });
    } catch (error) {
        console.error('Error fetching task:', error.message);
        res.status(500).json({ status: 'ERROR', message: error.message });
    }
};

const getTaskList = async (req, res) => {
    try {
        const tasks = await taskService.getAllTask();
        res.status(200).json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error.message);
        res.status(500).json({ status: 'ERR', message: 'Failed to fetch tasks' });
    }
};

const searchTasksByName = async (req, res) => {
    try {
        const partialName = req.params.partialName;
        const result = await taskService.searchTasksByName(partialName);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error searching tasks by partial name:', error.message);
        res.status(500).json({ status: 'ERROR', message: error.message });
    }
};

// Trong taskController.js
const addTaskToList = async (req, res) => {
    try {
        const { userId, taskId } = req.body;
        if (!userId || !taskId) {
            return res.status(400).send('Thiếu thông tin');
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('Người dùng không tìm thấy');
        }

        if (user.taskList.includes(taskId)) {
            return res.status(400).send('Nhiệm vụ đã có trong danh sách');
        }

        user.taskList.push(taskId);
        await user.save();

        res.status(200).send('Nhiệm vụ đã được thêm vào danh sách');
    } catch (error) {
        console.error('Error adding task to list:', error.message);
        res.status(500).send('Lỗi server');
    }
};
const getUserTasks = async (req, res) => {
    try {
        const userId = req.params.userId; // Lấy userId từ params hoặc từ xác thực người dùng
        const user = await User.findById(userId).populate('taskList'); // Tìm người dùng và populate danh sách nhiệm vụ

        if (!user) {
            return res.status(404).json({ status: 'ERROR', message: 'User not found' });
        }

        res.status(200).json({ status: 'OK', data: user.taskList });
    } catch (error) {
        console.error('Error fetching user tasks:', error.message);
        res.status(500).json({ status: 'ERROR', message: error.message });
    }
};


const getTasksByCategory = async (req, res) => {
    try {
        const category = req.params.category;
        const result = await taskService.getTasksByCategory(category);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error fetching tasks by category:', error.message);
        res.status(500).json({ status: 'ERROR', message: error.message });
    }
};
const addQuestionToTask = async (req, res) => {
    try {
        const { taskId, questionId } = req.body;
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        const question = await Question.findById(questionId);
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }
        task.questions.push(questionId);
        await task.save();
        res.status(200).json(task);
    } catch (error) {
        console.error('Add question to task error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.taskId;
        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({ status: 'ERROR', message: 'Task not found' });
        }

        await Task.findByIdAndDelete(taskId);
        res.status(200).json({ status: 'OK', message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Error deleting task:', error.message);
        res.status(500).json({ status: 'ERROR', message: 'Failed to delete task' });
    }
};




module.exports = {
    createTask,
    getTaskByName,
    getTaskById,
    getTaskList,
    searchTasksByName,
    addTaskToList,
    getUserTasks,
    getTasksByCategory,
    addQuestionToTask,
    updateTask,
    deleteTask
};
