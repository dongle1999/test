const express = require('express')
const authentication = require('../middlewares/authentication')
const { addOnNew, addOnUpdate, addOnDelete } = require('../../services/add-on')

const router = new express.Router();

// Create new addOn
router.post('/api/addOn/add', authentication, async(req, res) => {
    let _id = req.body.property;
    try {
        await addOnNew(req.body);
        res.status(201)
            .redirect(`/property/${_id}`);
    } catch (e) {
        res.status(400)
            .redirect(`/property/${_id}`);
    };
})

// Update addOn info
router.post('/api/addOn/update', authentication, async(req, res) => {
    let _id = req.body.property;
    try {
        await addOnUpdate(req.body);
        res.status(200)
            .redirect(`/property/${_id}`);
    } catch (e) {
        res.status(400)
            .redirect(`/property/${_id}`);
    };
});

// Delete addOn
router.post('/api/addOn/delete', authentication, async(req, res) => {
    let _id = req.body.property;
    try {
        await addOnDelete(req.body);
        res.status(200)
            .redirect(`/property/${_id}`);
    } catch (e) {
        res.status(400)
            .redirect(`/property/${_id}`);
    };
});

module.exports = router;