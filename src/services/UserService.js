const User = require("../models/user");

const createUser = async (newUser) => {
    const { name, email, password, age, avatar, pointday, pointweek } = newUser;
    try {
        const checkUser = await User.findOne({ email: email });
        if (checkUser) {
            return {
                status: 'ERR',
                message: 'The email is already registered'
            };
        }

        const createdUser = await User.create({ name, email, password, age, avatar, pointday, pointweek });
        return {
            status: 'OK',
            message: 'SUCCESS',
            data: createdUser
        };
    } catch (error) {
        throw new Error('Server error');
    }
};

const loginUser = async (loginData) => {
    const { email, password } = loginData;
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return {
                status: 'ERR',
                message: 'Invalid email or password'
            };
        }

        // Compare password directly without hashing (for demo purposes)
        if (user.password === password) {
            return {
                status: 'OK',
                message: 'Login successful',
                data: user
            };
        } else {
            return {
                status: 'ERR',
                message: 'Invalid email or password'
            };
        }
    } catch (error) {
        throw new Error('Server error');
    }
};

const updateUser = async (userId, updateData) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            return {
                status: 'ERR',
                message: 'User not found'
            };
        }
        if (updateData.name) user.name = updateData.name;
        if (updateData.email) user.email = updateData.email;
        if (updateData.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(updateData.password, salt);
        }
        await user.save();
        return {
            status: 'OK',
            message: 'User updated successfully',
            data: user
        };
    } catch (error) {
        throw new Error('Server error');
    }
};

const uploadUserAvatar = async (userId, file) => {
    try {
        const avatarUrl = `uploads/${file.filename}`;
        const user = await User.findByIdAndUpdate(
            userId,
            { avatarUrl },
            { new: true }
        );

        if (!user) {
            throw new Error('User not found');
        }

        return { status: 'OK', data: user };
    } catch (error) {
        throw new Error('Error updating user avatar: ' + error.message);
    }
};
const updateUserPoints = async (userId, points) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        user.pointday = points;
        await user.save();
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
};

const getUser = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            return {
                status: 'ERR',
                message: 'User not found'
            };
        }

        return {
            status: 'OK',
            message: 'User fetched successfully',
            data: user
        };
    } catch (error) {
        throw new Error('Server error');
    }
};

const getAllUsers = async () => {
    try {
        const users = await User.find({});
        return {
            status: 'OK',
            message: 'Users fetched successfully',
            data: users
        };
    } catch (error) {
        console.error('Error fetching users:', error);
        throw new Error('Error fetching users');
    }
};
const searchUsersByName = async (name) => {
    if (!name) {
        throw new Error('Tên không được để trống');
    }

    // Tạo biểu thức chính quy để tìm kiếm không phân biệt chữ hoa chữ thường
    const regex = new RegExp(name.split('').join('.*'), 'i');
    try {
        const users = await User.find({ name: { $regex: regex } }).exec();
        return users;
    } catch (error) {
        throw new Error('Lỗi khi tìm kiếm người dùng');
    }
};

module.exports = {
    createUser,
    loginUser,
    updateUser,
    getUser,
    uploadUserAvatar,
    getAllUsers,
    updateUserPoints,
    searchUsersByName
};
