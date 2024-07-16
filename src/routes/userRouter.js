const express = require('express');

const userController = require('../controllers/userController');
const multer = require('multer');
const path = require('path');
const userService = require('../services/UserService');
const router = express.Router();
// Thiết lập multer cho việc lưu trữ avatar
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads/'));
    },
    filename: function (req, file, cb) {
        // Tên file được lưu là userId-timestamp.jpg (hoặc .png, .jpeg tùy theo loại file)
        const ext = path.extname(file.originalname);
        cb(null, req.params.userId + '-' + Date.now() + ext);
    }
});

const upload = multer({ storage: storage });

// Định nghĩa route POST để upload avatar
router.post('/:userId/avatar', upload.single('avatar'), async (req, res) => {
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
});
router.post('/updatePoints', userController.updateUserPoints);
router.get('/listUsers', userController.getUserList);
router.post('/register', userController.createUser);
router.post('/login', userController.loginUser);
router.get('/:userId', userController.getUser);

module.exports = router;
