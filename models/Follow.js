const mongoose = require('mongoose');
const { Schema } = mongoose;

const FollowSchema = new Schema({
    // User Id of Another USer That Follower By Following, This id is get from url
    follower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    // Own User ID , This id is get from auth-token
    following: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
})

module.exports = mongoose.model('follow', FollowSchema);