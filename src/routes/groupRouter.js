const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');

// Định nghĩa các routes cho nhóm
router.post('/create', groupController.createGroup);
router.get('/:groupId', groupController.getGroupById);

module.exports = router;
