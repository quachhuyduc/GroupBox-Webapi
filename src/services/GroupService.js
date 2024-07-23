// GroupService.js
const Group = require('../models/group');

// Tạo mới nhóm
async function createGroup(name, description, members) {
    try {
        const newGroup = new Group({
            name,
            description,
            members
        });
        const savedGroup = await newGroup.save();
        return savedGroup;
    } catch (error) {
        throw Error('Error creating group');
    }
}

// Lấy thông tin nhóm theo ID
async function getGroupById(groupId) {
    try {
        const group = await Group.findById(groupId).populate('members', 'username email age'); // Populate members from User collection
        if (!group) {
            return {
                status: 'ERR',
                message: 'group not found'
            };
        }

        return {
            status: 'OK',
            message: 'task fetched successfully',
            data: group
        };
    } catch (error) {
        throw Error('Error fetching group by ID');
    }
}

module.exports = {
    createGroup,
    getGroupById
};
