const express = require('express')
const randomstring = require('randomstring')
const authentication = require('../middlewares/authentication')
const uploadUserAvatar = require('../middlewares/multer')
const { client, getAsync } = require('../../loaders/redis')
const {
    usernameCheck,
    emailCheck,
    userSignup,
    userLogin,
    userAvatarUpdate,
    userUpdate,
    userPasswordChange,
    userLogout
} = require('../../services/user')

const router = new express.Router();

// Username check
router.post('/api/user/signup/username_check', async(req, res) => {
    try {
        await usernameCheck(req.body)
        res.json({
            result: 'available'
        });
    } catch (e) {
        res.json({
            result: 'taken'
        });
    };
});

// Email check
router.post('/api/user/signup/email_check', async(req, res) => {
    try {
        await emailCheck(req.body)
        res.json({
            result: 'available'
        });
    } catch (e) {
        res.json({
            result: 'taken'
        });
    };
});

// Sign up
router.post('/api/user/signup', async(req, res) => {
    try {
        await userSignup(req.body);
        res.status(201)
            .redirect('/');
    } catch (e) {
        res.status(400)
            .redirect('/signup');
    };
});

// Log in
router.post('/api/user/login', async(req, res) => {
    try {
        // Validate credentials
        const { user, token } = await userLogin(req.body);

        // Generate sessionId
        const sessionId = await randomstring.generate({
            length: 255,
            charset: 'alphabetic'
        });

        // Save data in cache
        client.hset('user', sessionId, token);

        res.status(202)
            .cookie('sessionId', sessionId, { httpOnly: true, signed: true })
            .redirect('/');
    } catch (e) {
        res.status(401)
            .cookie('message', e.message, {
                expire: 1000,
                maxAge: 1000,
            })
            .redirect('/');
    };
});

// Update user avatar
router.post('/api/user/profile/avatar/update', authentication, uploadUserAvatar.any(), async(req, res) => {
    try {
        const { userUpdated } = await userAvatarUpdate(req.user._id, req.files);
        req.user = userUpdated.toJSON();
        res.status(200)
            .redirect('/account/profile');
    } catch (e) {
        res.status(400)
            .redirect('/account/profile');
    };
});

// Update user info
router.post('/api/user/profile/info/update', authentication, async(req, res) => {
    try {
        const { userUpdated } = await userUpdate(req.user._id, req.body);
        req.user = userUpdated.toJSON();
        res.status(200)
            .redirect('/account/profile');
    } catch (e) {
        res.status(400)
            .redirect('/account/profile');
    };
});

// Update password
router.post('/api/user/profile/password/update', authentication, async(req, res) => {
    try {
        const { userUpdated } = await userPasswordChange(req.user._id, req.body);
        req.user = userUpdated.toJSON();
        res.status(200)
            .redirect('/account/security');
    } catch (e) {
        res.status(400)
            .redirect('/account/security');
    };
});

// Log out
router.post('/api/user/logout', authentication, async(req, res) => {
    try {
        // Get sessionId in cookie
        const sessionId = req.signedCookies.sessionId;
        // Get token
        async() => { client.hget('user', sessionId) }
        const token = await getAsync('user', sessionId);
        // Log out
        await userLogout(token);
        // Delete hash record in the redis database
        client.hdel('user', sessionId);
        res.status(200)
            .clearCookie('sessionId')
            .redirect('/');
    } catch (e) {
        res.status(500)
            .send();
    };
});

module.exports = router;