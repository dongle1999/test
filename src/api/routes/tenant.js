const express = require('express')
const authentication = require('../middlewares/authentication')
const { tenantNew, tenantUpdate, tenantDelete } = require('../../services/tenant')

const router = new express.Router();

// Create new tenant
router.post('/api/tenant/add', authentication, async(req, res) => {
    let _id = req.body.property;
    try {
        await tenantNew(req.body);
        res.status(201)
            .redirect(`/property/${_id}` + '#.js-tenant-panel');
    } catch (e) {
        res.status(400)
            .redirect(`/property/${_id}` + '#.js-tenant-panel');
    };
});

// Update tenant info
router.post('/api/tenant/update', authentication, async(req, res) => {
    let _id = req.body.property;
    try {
        await tenantUpdate(req.body)
        res.status(200)
            .redirect(`/property/${_id}` + '#.js-tenant-panel');
    } catch (e) {
        res.status(400)
            .redirect(`/property/${_id}` + '#.js-tenant-panel');
    };
});

// Delete tenant
router.post('/api/tenant/delete', authentication, async(req, res) => {
    let _id = req.body.property;
    try {
        await tenantDelete(req.body)
        res.status(200)
            .redirect(`/property/${_id}` + '#.js-tenant-panel');
    } catch (e) {
        res.status(400)
            .redirect(`/property/${_id}` + '#.js-tenant-panel');
    };
});

module.exports = router;