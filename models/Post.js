const mongoose = require('mongoose');
const { Schema } = mongoose;

const PostSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    created_At: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('post', PostSchema);