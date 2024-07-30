const User = require('../models/user');
const userService = require('../services/UserService');

const createUser = async (req, res) => {
    try {
        const result = await userService.createUser(req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ status: 'ERR', message: 'Server error' });
    }
};

const loginUser = async (req, res) => {
    try {
        const result = await userService.loginUser(req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ status: 'ERR', message: 'Server error' });
    }
};


const updateUser = async (req, res) => {
    try {
        const result = await userService.updateUser(req.params.userId, req.body);
        if (result.status === 'ERR') {
            return res.status(404).json(result);  // Trả về lỗi 404 nếu người dùng không tìm thấy
        }
        res.status(200).json(result);
    } catch (error) {
        console.error('Controller error:', error);
        res.status(500).json({ status: 'ERR', message: 'Server error' });
    }
};

const updateUserAvatar = async (req, res) => {
    const userId = req.params.userId;
    const file = req.file;

    try {
        if (!file) {
            throw new Error('No file uploaded');
        }

        const updatedUser = await userService.uploadUserAvatar(userId, file);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ status: 'ERR', message: error.message });
    }
};

const updateUserPoints = async (req, res) => {
    const { userId, points } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Người dùng không tồn tại' });
        }

        // Kiểm tra kiểu dữ liệu của điểm
        if (typeof user.pointday !== 'number') {
            return res.status(400).json({ message: 'Điểm không hợp lệ' });
        }

        console.log(`User ID: ${userId}, Current Points: ${user.pointday}, Points to Add: ${points}`);

        // Cộng điểm
        user.pointday += points;
        await user.save();

        console.log(`Updated Points: ${user.pointday}`);

        res.status(200).json({ message: 'Điểm đã được cập nhật thành công', newPoints: user.pointday });
    } catch (error) {
        console.error('Lỗi khi cập nhật điểm:', error);
        res.status(500).json({ message: 'Lỗi khi cập nhật điểm', error });
    }
};





const getUser = async (req, res) => {
    try {
        const result = await userService.getUser(req.params.userId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ status: 'ERR', message: 'Server error' });
    }
};
const getUserList = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error.message);
        res.status(500).json({ status: 'ERR', message: 'Failed to fetch users' });
    }
};
const searchUsers = async (req, res) => {
    const { name } = req.params;

    try {
        const users = await userService.searchUsersByName(name);
        res.json({ status: 'OK', data: users });
    } catch (error) {
        res.status(500).json({ status: 'ERROR', message: error.message });
    }
};
const deleteUser = async (req, res) => {
    try {
        const result = await userService.deleteUser(req.params.userId);
        if (result.status === 'ERR') {
            return res.status(404).json(result);  // Trả về lỗi 404 nếu người dùng không tìm thấy
        }
        res.status(200).json(result);
    } catch (error) {
        console.error('Controller error:', error);
        res.status(500).json({ status: 'ERR', message: 'Server error' });
    }
};


module.exports = {
    createUser,
    loginUser,
    updateUser,
    getUser,
    updateUserAvatar,
    getUserList,
    updateUserPoints,
    searchUsers,
    deleteUser
};
