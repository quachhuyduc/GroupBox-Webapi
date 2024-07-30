const express = require('express');
const topicController = require('../controllers/topicController');
const router = express.Router();

router.post('/topics', topicController.createTopic); // Tạo chủ đề mới
router.get('/topics', topicController.getTopics); // Lấy danh sách tất cả chủ đề
router.get('/topics/:id', topicController.getTopicById); // Lấy chủ đề theo ID
router.put('/topics/:id', topicController.updateTopic); // Cập nhật chủ đề
router.delete('/topics/:id', topicController.deleteTopic); // Xóa chủ đề
router.post('/topics/:id/tasks', topicController.addTaskToTopic); // Thêm task vào chủ đề
router.get('/topics/:id/tasks', topicController.getTasksByTopic); // Lấy các task theo chủ đề

module.exports = router;
