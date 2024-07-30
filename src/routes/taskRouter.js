// routes/taskRoutes.js
const express = require('express');

const taskController = require('../controllers/taskController');
const router = express.Router();


// Định nghĩa các route theo thứ tự để tránh xung đột
router.post('/tasks', taskController.createTask);
router.get('/listTasks', taskController.getTaskList);
router.get('/tasks/:name', taskController.getTaskByName);
router.get('/:taskId', taskController.getTaskById);
router.get('/search/:partialName', taskController.searchTasksByName);
router.post('/add', taskController.addTaskToList);
router.get('/userTasks/:userId', taskController.getUserTasks);
router.get('/category/:category', taskController.getTasksByCategory);
router.post('/add-question', taskController.addQuestionToTask);
router.put('/tasks/:taskId', taskController.updateTask);
router.delete('/delete-task/:taskId', taskController.deleteTask);
// Sử dụng prefix '/tasks' cho route '/:taskId'
// Sử dụng prefix '/tasks' cho route '/list'

module.exports = router;
