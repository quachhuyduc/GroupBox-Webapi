const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String },
    age: { type: Number },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatarUrl: {
        type: String,
    },
    pointday: { type: Number, default: 0 },
    pointweek: { type: Number, default: 0 }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
