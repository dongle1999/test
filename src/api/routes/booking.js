const express = require('express')
const authentication = require('../middlewares/authentication')
const { bookingNew, bookingDecline } = require('../../services/booking')

const router = new express.Router();

// Create new booking
router.post('/api/booking/list/:id', async(req, res) => {
    let _id = req.params.id;
    try {
        await bookingNew(req.body, req.params.id);
        res.status(201)
            .redirect(`/booking/${_id}`);
    } catch (e) {
        res.status(400)
            .redirect(`/booking/${_id}`);
    };
});

// Decline booking
router.post('/api/booking/decline', authentication, async(req, res) => {
    let _id = req.body.property;
    try {
        await bookingDecline(req.body);
        res.status(200)
            .redirect(`/property/${_id}` + '#.js-booking-panel');
    } catch (e) {
        res.status(400)
            .redirect(`/property/${_id}` + '#.js-booking-panel');
    };
});

module.exports = router;