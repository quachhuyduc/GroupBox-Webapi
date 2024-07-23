// controllers/taskController.js
const Task = require('../models/task');
const User = require('../models/user');
const taskService = require('../services/TaskService');

const createTask = async (req, res) => {
    try {
        const taskData = req.body;
        const newTask = await taskService.createTask(taskData);
        res.status(201).json(newTask);
    } catch (error) {
        res.status(400).json({ error: error.message });
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







module.exports = {
    createTask,
    getTaskByName,
    getTaskById,
    getTaskList,
    searchTasksByName,
    addTaskToList,
    getUserTasks
};
