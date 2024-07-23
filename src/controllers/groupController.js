// GroupController.js
const groupService = require('../services/GroupService');

// Controller để tạo mới nhóm
const createGroup = async (req, res) => {
    const { name, description, members } = req.body;
    try {
        const newGroup = await groupService.createGroup(name, description, members);
        res.status(201).json(newGroup);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Controller để lấy thông tin nhóm theo ID
const getGroupById = async (req, res) => {
    const groupId = req.params.groupId;
    try {
        const group = await groupService.getGroupById(groupId);
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }
        res.status(200).json(group);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createGroup,
    getGroupById
};
