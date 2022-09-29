const mongoose = require('mongoose');
const { Schema } = mongoose;

const LikeSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post'
    },
    like: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('like', LikeSchema);