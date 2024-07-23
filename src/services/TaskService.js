// services/taskService.js
const Task = require('../models/task');

const createTask = async (taskData) => {
    const newTask = new Task(taskData);
    return await newTask.save();
};
const getTaskByName = async (name) => {
    return Task.findOne({ nameTask: name });
};
const getTaskById = async (taskId) => {
    try {
        const task = await Task.findById(taskId);
        if (!task) {
            return {
                status: 'ERR',
                message: 'task not found'
            };
        }

        return {
            status: 'OK',
            message: 'task fetched successfully',
            data: task
        };
    } catch (error) {
        throw new Error('Server error');
    }
};
const getAllTask = async () => {
    try {
        const tasks = await Task.find({})
        return {
            status: 'OK',
            message: 'Tasks fetched successfully',
            data: tasks
        };
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw new Error('Error fetching tasks');
    }
};
const searchTasksByName = async (partialName) => {
    try {
        // Sử dụng regex để tìm kiếm gần đúng
        const regex = new RegExp(partialName, 'i'); // 'i' để không phân biệt hoa thường
        const tasks = await Task.find({ nameTask: { $regex: regex } });
        return {
            status: 'OK',
            message: 'Tasks found successfully',
            data: tasks
        };
    } catch (error) {
        console.error('Error searching tasks by name:', error);
        throw new Error('Error searching tasks');
    }
};

module.exports = {
    createTask,
    getTaskByName,
    getTaskById,
    getAllTask,
    searchTasksByName
};
