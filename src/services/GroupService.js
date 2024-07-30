// GroupService.js
const Group = require('../models/group');

// Tạo mới nhóm
const createGroup = async (name) => {
    const group = new Group({
        name
    });
    return await group.save();
};
const getGroupForMember = async (groupId, userId) => {
    try {
        const group = await Group.findById(groupId).populate('members', 'username email age');

        if (!group) {
            return {
                status: 'ERR',
                message: 'Group not found'
            };
        }

        if (!group.members.some(member => member._id.toString() === userId.toString())) {
            return {
                status: 'ERR',
                message: 'Access denied'
            };
        }

        return {
            status: 'OK',
            message: 'Group fetched successfully',
            data: group
        };
    } catch (error) {
        throw new Error('Error fetching group for member');
    }
};
// Thêm member vào nhóm
async function addMemberToGroup(groupId, userId) {
    try {
        const group = await Group.findById(groupId);
        if (!group) {
            throw Error('Group not found');
        }

        if (!group.members.includes(userId)) {
            group.members.push(userId);
            await group.save();
        }

        return group;
    } catch (error) {
        throw Error('Error adding member to group');
    }
}
const getGroupMembers = async (groupId) => {
    try {
        const group = await Group.findById(groupId).populate('members'); // Lấy thông tin thành viên từ ID
        if (!group) {
            throw new Error('Group not found');
        }
        return group.members;
    } catch (error) {
        throw new Error(error.message);
    }
};
const removeMemberFromGroup = async (groupId, userId, adminId) => {
    try {
        const group = await Group.findById(groupId);
        if (!group) {
            throw new Error('Group not found');
        }

        if (group.admin.toString() !== adminId.toString()) {
            throw new Error('Unauthorized');
        }

        if (group.members.includes(userId)) {
            group.members = group.members.filter(member => member.toString() !== userId);
            await group.save();
        }

        return group;
    } catch (error) {
        throw new Error(error.message);
    }
}
const getAllGroup = async () => {
    try {
        const groups = await Group.find({})
        return {
            status: 'OK',
            message: 'Group fetched successfully',
            data: groups
        };
    } catch (error) {
        console.error('Error fetching Group:', error);
        throw new Error('Error fetching Group');
    }
};
const getGroupById = async (groupId) => {
    try {
        const group = await Group.findById(groupId);
        if (!group) {
            return {
                status: 'ERR',
                message: 'group not found'
            };
        }

        return {
            status: 'OK',
            message: 'group fetched successfully',
            data: group
        };
    } catch (error) {
        throw new Error('Server error');
    }
};


module.exports = {
    createGroup,
    addMemberToGroup,
    getGroupMembers,
    getGroupForMember,
    removeMemberFromGroup,
    getAllGroup,
    getGroupById
};
