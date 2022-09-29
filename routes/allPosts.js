const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser');
const Posts = require('../models/Post');
const Like = require('../models/Like');
const Comment = require('../models/Comment');


router.get('/', fetchUser, async (req, res) => {
    try {
        const userId = req.user.id;
        const post = await Posts.find({ user: userId }).select("-user")

        var posts = new Array;

        for (let index = 0; index < post.length; index++) {
            const element = post[index];
            const comments = await Comment.find({ post: element.id });
            const likes = await Like.countDocuments({ like: 'Like', post: element.id });
            posts.push({post:element, comments,likes })
        }

        res.json(posts);

    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});



module.exports = router;