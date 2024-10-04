const express = require('express')
const authentication = require('../middlewares/authentication')
const {
    propertyNew,
    propertyEdit,
    propertyDelete
} = require('../../services/property')

const router = new express.Router();

// Create new property
router.post('/api/property/add', authentication, async(req, res) => {
    try {
        await propertyNew(req.body, req.user._id);
        res.status(201)
            .redirect('/');
    } catch (e) {
        res.status(400)
            .redirect('/');
    };
});

// Update property info
router.post('/api/property/edit', authentication, async(req, res) => {
    try {
        await propertyEdit(req.body);
        res.status(201)
            .redirect('/');
    } catch (e) {
        res.status(400)
            .redirect('/');
    };
});

// Delete property
router.post('/api/property/delete', authentication, async(req, res) => {
    try {
        await propertyDelete(req.body, req.user._id);
        res.status(200)
            .redirect('/');
    } catch (e) {
        res.status(400)
            .redirect('/');
    };
});

module.exports = router;