const express = require('express')
const authentication = require('../middlewares/authentication')
const { catalogNew, catalogUpdate, catalogDelete } = require('../../services/catalog')

const router = new express.Router();

// Create new catalog
router.post('/api/catalog/add', authentication, async(req, res) => {
    let _id = req.body.property;
    try {
        await catalogNew(req.body);
        res.status(201)
            .redirect(`/property/${_id}`);
    } catch (e) {
        res.status(400)
            .redirect(`/property/${_id}`);
    };
});

// Update catalog info
router.post('/api/catalog/update', authentication, async(req, res) => {
    let _id = req.body.property;
    try {
        await catalogUpdate(req.body);
        res.status(201)
            .redirect(`/property/${_id}`);
    } catch (e) {
        res.status(400)
            .redirect(`/property/${_id}`);
    };
});

// Delete catalog
router.post('/api/catalog/delete', authentication, async(req, res) => {
    let _id = req.body.property;
    try {
        await catalogDelete(req.body);
        res.status(201)
            .redirect(`/property/${_id}`);
    } catch (e) {
        res.status(400)
            .redirect(`/property/${_id}`);
    };
});

module.exports = router;