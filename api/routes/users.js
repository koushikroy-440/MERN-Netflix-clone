const router = require('express').Router();
const User = require('../model/User.model');
const CryptoJS = require('crypto-js');
const verify = require('../verifyToken');

//UPDATE

router.put("/:id", verify, async (req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        if (req.body.password) {
            req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString()
        }
        try {
            const updateUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            },
                { new: true }
            );

            res.status(200).json(updateUser);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json('you can update only your account!');
    }
});

//DELETE

router.delete('/:id', verify, async (req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        try {
            await User.findByIdAndDelete(req.params.id);
            return res.status(200).json('user has been deleted');
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json('you can update only your account!');
    }
});

//GET SINGLE USER

router.get('/find/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        // sent user data except password
        const { password, ...info } = user._doc;
        res.status(200).json(info);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ALL USERS

router.get('/', verify, async (req, res) => {
    const query = req.query.new;
    if (req.user.isAdmin) {
        try {
            const users = query ? await User.find().sort({ _id: -1 }).limit(10) : await User.find();
            return res.status(200).json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        return res.status(500).json('you are not allowed to see all users!');
    }
});

//GET USER STATS
router.get("/stats", async (req, res) => {
    const today = new Date();
    const latYear = today.setFullYear(today.setFullYear() - 1);

    try {
        const data = await User.aggregate([
            {
                $project: {
                    month: { $month: "$createdAt" },
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 },
                },
            },
        ]);
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;