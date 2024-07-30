// GroupController.js
const Group = require('../models/group');
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

const getGroupForMember = async (req, res) => {
    const groupId = req.params.groupId;
    const userId = req.body.userId; // Lấy userId từ request body

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        const group = await groupService.getGroupForMember(groupId, userId);
        if (group.status === 'ERR') {
            return res.status(403).json({ message: group.message });
        }
        res.status(200).json(group);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const addMember = async (req, res) => {
    try {
        const { groupId, userId } = req.body;

        if (!groupId || !userId) {
            return res.status(400).json({ status: 'ERROR', message: 'Thiếu thông tin nhóm hoặc người dùng' });
        }

        // Tìm nhóm và thêm thành viên
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ status: 'ERROR', message: 'Nhóm không tồn tại' });
        }

        if (group.members.includes(userId)) {
            return res.status(400).json({ status: 'ERROR', message: 'Người dùng đã là thành viên của nhóm' });
        }

        group.members.push(userId);
        await group.save();

        res.json({ status: 'OK', message: 'Thành viên đã được thêm vào nhóm' });
    } catch (error) {
        console.error('Lỗi khi thêm thành viên vào nhóm:', error);
        res.status(500).json({ status: 'ERROR', message: 'Lỗi khi thêm thành viên vào nhóm' });
    }
}
const getGroupMembers = async (req, res) => {
    try {
        const { groupId } = req.params;
        const members = await groupService.getGroupMembers(groupId);
        res.json({ status: 'OK', members });
    } catch (error) {
        res.status(500).json({ status: 'ERROR', message: error.message });
    }
};

const removeMember = async (req, res) => {
    try {
        const { groupId, userId, adminId } = req.body; // Lấy adminId từ request body

        if (!groupId || !userId || !adminId) {
            return res.status(400).json({ status: 'ERROR', message: 'Thiếu thông tin nhóm, người dùng hoặc quản trị viên' });
        }

        // Tìm nhóm và kiểm tra quyền quản trị viên
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ status: 'ERROR', message: 'Nhóm không tồn tại' });
        }

        if (group.admin.toString() !== adminId.toString()) {
            return res.status(403).json({ status: 'ERROR', message: 'Bạn không có quyền xóa thành viên này' });
        }

        // Xóa thành viên khỏi nhóm
        group.members = group.members.filter(member => member.toString() !== userId);
        await group.save();

        res.json({ status: 'OK', message: 'Thành viên đã được xóa khỏi nhóm' });
    } catch (error) {
        console.error('Lỗi khi xóa thành viên khỏi nhóm:', error);
        res.status(500).json({ status: 'ERROR', message: 'Lỗi khi xóa thành viên khỏi nhóm' });
    }
}
const getGroupList = async (req, res) => {
    try {
        const groups = await groupService.getAllGroup();
        res.status(200).json(groups);
    } catch (error) {
        console.error('Error fetching tasks:', error.message);
        res.status(500).json({ status: 'ERR', message: 'Failed to fetch tasks' });
    }
};


module.exports = {
    createGroup,
    getGroupForMember,
    addMember,
    getGroupMembers,
    removeMember,
    getGroupList
};
