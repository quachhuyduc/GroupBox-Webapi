// controllers/taskController.js
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

module.exports = {
    createTask,
    getTaskByName,
    getTaskById,
    getTaskList
};
