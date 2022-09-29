const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser');
const Posts = require('../models/Post');
const Comment = require('../models/Comment');
const Like = require('../models/Like');
const { body, validationResult } = require('express-validator');

// Validation Array
const validate = [
    body('title', 'Title must be atleast 3 Characters').isLength({ min: 3 }),
    body('description', 'Description must be atleast 10 Characters').isLength({ min: 10 })
]

// Route : 1 
router.post('/', fetchUser, validate, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }


    try {
        const { title, description } = req.body
        const post = new Posts({
            title, description, user: req.user.id
        })

        const saveNote = await post.save()
        res.json(saveNote)

    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error");
    }
});

// Route : 2
router.delete('/:id', fetchUser, async (req, res) => {
    try {

        const post = await Posts.findById(req.params.id);

        if (!post) {
            return res.status(404).send('Not Found');
        }
        if (post.user.toString() !== req.user.id) {
            return res.status(401).send('Not Allowed');
        }
        const deletedpost = await Posts.findByIdAndDelete(post)
        res.json({ sucess: "Post Has Been Deleted", deletedpost })
    } catch (error) {

        console.log(error)
        res.status(500).send("Internal Server Error");
    }
});


// Route : 3
router.get('/:id', fetchUser, async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Posts.findById(postId)

        const TotalLike = await Like.countDocuments({ like: "Like" });
        const TotalComments = await Comment.countDocuments({ post: postId });

        res.json({ post, TotalLike, TotalComments });

    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;