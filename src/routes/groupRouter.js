const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');
router.post('/create', groupController.createGroup);
router.post('/add-member', groupController.addMember);
router.get('/:groupId/members', groupController.getGroupMembers);
router.post('/:groupId/member-info', groupController.getGroupForMember);
router.post('/remove-member', groupController.removeMember);
router.get('/listGroups', groupController.getGroupList);
router.get('/:groupId', groupController.getGroupById);
router.put('/update-group/:groupId', groupController.updateGroup); // Route cho cập nhật nhóm
router.delete('/delete-group/:groupId', groupController.deleteGroup); // Route cho xóa nhóm
module.exports = router;
