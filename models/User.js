const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    googleId: String,
    username: String,
    thumbnail: String
});

module.exports = mongoose.model('User', UserSchema);
