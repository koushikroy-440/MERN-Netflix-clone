const router = require('express').Router();
const User = require('../model/User.model');
var CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');

//sign up

router.post('/register', async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString()
    });
    try {
        const user = await newUser.save();
        res.status(200);
        res.json(user);
    } catch (err) {
        console.log(err);
    }

});

//login 
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        !user && res.status(404).json('wrong password or username');

        const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

        originalPassword !== req.body.password &&
            res.status(401).json('wrong password or username');
        //create token
        const accessToken = jwt.sign({ id: user._id, isAdmin: user.isAdmin },
            process.env.SECRET_KEY,
            { expiresIn: "5d" }
        );

        // sent user data except password
        const { password, ...info } = user._doc;

        res.status(200).json(info);
    } catch (err) {
        console.log(err);
    }

})


module.exports = router;