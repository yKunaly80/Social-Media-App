const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser');
const Follow = require('../models/Follow');

const jwtSecret = 'PostAppApi';


// Validation Array
const validateLogin = [
    body('email', 'Enter a Valid Email').isEmail(),
    body('password', 'Password must be atleast 8 Characters').isLength({ min: 8 })
]

// Route : 1
router.post('/authenticate', validateLogin, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email, password });
        if (!user) {
            return res.status(400).json({ error: 'Please Try To Login With Correct Credentials' })
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, jwtSecret);
        res.json({ authToken });

    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

// Route : 2
router.get('/user', fetchUser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select('-password')
        
        const TotalFollower = await Follow.countDocuments({follower:userId});
        const TotalFollowing = await Follow.countDocuments({following:userId});

        res.json({user,TotalFollower,TotalFollowing});
        
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

// Route : 3
router.post('/follow/:id', fetchUser, async (req, res) => {
    try {
        const following = req.user.id;

        const follow = await Follow.findOne({ follower: req.params.id,following });
        if (follow) {
            return res.status(400).json({ error: 'You Already Follow' })
        }
        const FollowNow = new Follow({
            following, follower: req.params.id
        })
        const saveFollow = await FollowNow.save()
        res.json({ sucess: "you Just Follow", saveFollow })

    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
})


// Route : 4
router.post('/unfollow/:id', fetchUser, async (req, res) => {
    try {
        const following = req.user.id;

        const follow = await Follow.findOne({ follower: req.params.id, following });
        if (!follow) {
            return res.status(400).json({ error: 'You Are Not Following' })
        }

        const unFollow = await Follow.findOneAndDelete({ follower: req.params.id, following })
        res.json({ sucess: "You Just unFollow", unFollow })

    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router;