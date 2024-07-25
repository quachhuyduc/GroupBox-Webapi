const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');
router.post('/create', groupController.createGroup);
router.post('/add-member', groupController.addMember);
router.get('/:groupId/members', groupController.getGroupMembers);
router.post('/:groupId/member-info', groupController.getGroupForMember);
router.post('/remove-member', groupController.removeMember);
module.exports = router;
