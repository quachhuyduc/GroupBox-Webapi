// routes/taskRoutes.js
const express = require('express');

const taskController = require('../controllers/taskController');
const router = express.Router();


// Định nghĩa các route theo thứ tự để tránh xung đột
router.post('/tasks', taskController.createTask);
router.get('/listTasks', taskController.getTaskList);
router.get('/tasks/:name', taskController.getTaskByName);
router.get('/:taskId', taskController.getTaskById); // Sử dụng prefix '/tasks' cho route '/:taskId'
// Sử dụng prefix '/tasks' cho route '/list'

module.exports = router;
