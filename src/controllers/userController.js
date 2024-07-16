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
        res.status(200).json(result);
    } catch (error) {
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
        const updatedUser = await userService.updateUserPoints(userId, points);
        res.status(200).json({ status: 'OK', data: updatedUser });
    } catch (error) {
        res.status(500).json({ status: 'Error', message: error.message });
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




module.exports = {
    createUser,
    loginUser,
    updateUser,
    getUser,
    updateUserAvatar,
    getUserList,
    updateUserPoints
};
