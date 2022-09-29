const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser');
const Posts = require('../models/Post');
const Comment = require('../models/Comment');
const { body, validationResult } = require('express-validator');

const validate = [
    body('comment', 'Comment must be atleast 3 Characters').isLength({ min: 3 }),
]

router.post('/:id', fetchUser, validate, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const postid = await Posts.findById(req.params.id);
      
        if (!postid) {
            return res.status(404).send('Not Found');
        }

        const { comment } = req.body

        const newcomment = new Comment({
            comment, post: req.params.id, user: req.user.id
        })

        const saveComment = await newcomment.save()
        res.json(saveComment)

    } catch (error) {
        res.status(500).send("Internal Server Error");
    }

});

module.exports = router;