const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser');
const Posts = require('../models/Post');
const Like = require('../models/Like');

router.post('/:id', fetchUser, async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id);

        if (!post) {
            return res.status(404).send('Not Found');
        }

        const like = await Like.findOne({ user: req.user.id, post: req.params.id })

        if (like) {
            if (like.like === 'Unlike') {
                return res.send('You Already UnLike This Post');
            }

            const newlike = { like: "Unlike" }

            const updateLike = await Like.findByIdAndUpdate(like.id, { $set: newlike }, { new: true })

            res.json(updateLike)
        } else {

            const newLike = new Like({
                like: "UnLike", user: req.user.id, post: req.params.id
            })

            const saveLike = await newLike.save()
            res.json(saveLike)
        }
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }

});

module.exports = router;