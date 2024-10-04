const express = require('express')
const authentication = require('../middlewares/authentication')
const { roomNew, roomUpdate, roomDelete } = require('../../services/room')

const router = new express.Router();

// Create new room
router.post('/api/room/add', authentication, async(req, res) => {
    let _id = req.body.property;
    try {
        await roomNew(req.body)
        res.status(201)
            .redirect(`/property/${_id}` + '#.js-room-panel');
    } catch (e) {
        res.status(400)
            .redirect(`/property/${_id}` + '#.js-room-panel');
    };
});

// Update room info
router.post('/api/room/update', authentication, async(req, res) => {
    let _id = req.body.property;
    try {
        await roomUpdate(req.body);
        res.status(200)
            .redirect(`/property/${_id}` + '#.js-room-panel');
    } catch (e) {
        res.status(400)
            .redirect(`/property/${_id}` + '#.js-room-panel');
    };
});

// Delete room
router.post('/api/room/delete', authentication, async(req, res) => {
    let _id = req.body.property;
    try {
        await roomDelete(req.body);
        res.status(200)
            .redirect(`/property/${_id}` + '#.js-room-panel');
    } catch (e) {
        res.status(400)
            .redirect(`/property/${_id}` + '#.js-room-panel');
    };
});

module.exports = router;