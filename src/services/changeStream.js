const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const User = require('../models/user'); // Đường dẫn đến mô hình User

// Hàm gửi email thông báo
const sendNotificationEmail = async (toEmail, subject, text) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER, // Thay thế bằng email của bạn
            pass: process.env.EMAIL_PASS  // Thay thế bằng mật khẩu email của bạn
        }
    });

    await transporter.sendMail({
        from: `"Notification" <${process.env.EMAIL_USER}>`, // Thay thế bằng email của bạn
        to: 'quachhuyduc953@gmail.com',
        subject: subject,
        text: text
    });
};

// Khởi động Change Stream
const startChangeStream = () => {
    const changeStream = User.watch();

    changeStream.on('change', async (change) => {
        if (change.operationType === 'update') {
            const updatedUser = await User.findById(change.documentKey._id);

            const users = await User.find({});

            for (let otherUser of users) {
                if (otherUser.email !== updatedUser.email && updatedUser.pointday > otherUser.pointday) {
                    await sendNotificationEmail(
                        otherUser.email,
                        'Rank Surpassed',
                        `Your rank has been surpassed by ${updatedUser.email}.`
                    );
                }
            }
        }
    });

    console.log('Change stream is watching for changes...');
};

module.exports = startChangeStream;
