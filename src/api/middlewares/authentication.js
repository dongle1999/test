const jwt = require('jsonwebtoken');
const { client, getAsync } = require('../../loaders/redis');
const User = require('../../models/user');

const authentication = async (req, res, next) => {
    try {
        // Get sessionId in cookie
        const sessionId = req.signedCookies.sessionId;

        // Check if sessionId is associated with a record in the redis database
        if (!sessionId || !sessionId === '') {
            throw new Error();
        }

        // Check if sessionId has a token
        async () => { client.hget('user', sessionId); };
        const token = await getAsync('user', sessionId);

        if (!token || token === '') {
            throw new Error();
        }

        // Validate token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

        if (!user) {
            throw new Error();
        }

        req.user = JSON.parse(user);
        req.token = token;

        next();
    } catch (e) {
        console.log('Error: Authentication is required.');

        next();
    }
};

module.exports = authentication;