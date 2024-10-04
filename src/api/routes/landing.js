const fs = require('fs');
const path = require('path');
const authentication = require('../middlewares/authentication');
const { propertyList, propertyGet, propertyView } = require('../../services/property');
const { catalogList } = require('../../services/catalog');
const { addOnList } = require('../../services/add-on');
const { roomList } = require('../../services/room');
const { tenantList } = require('../../services/tenant');
const { bookingList } = require('../../services/booking');

module.exports = async(app, outputTemplate) => {
    // Booking
    app.get("/booking/:id", async(req, res) => {
        const { property } = await propertyView(req.params.id);
        const { catalogs } = await catalogList(property._id);
        const header = {
            title: 'Booking',
            property,
            catalogs
        };
        const output = await outputTemplate('../../views/pages/booking.hbs', header);
        res.status(200)
            .send(output);
    })

    // Sign up
    app.get('/signup', async(req, res) => {
        if (req.user && req.token) {
            res.status(401)
                .redirect('/');
        } else {
            const header = {
                title: 'Sign up',
            };
            const output = await outputTemplate('../../views/pages/signup.hbs', header);
            res.status(200)
                .send(output);
        }
    });

    // Log in
    app.get('/', authentication, async(req, res) => {
        if (req.user && req.token) {
            const { properties } = await propertyList(req.user._id);
            const header = {
                title: 'Property',
                header: 'Property',
                user: req.user,
                properties,
            };
            const output = await outputTemplate('../../views/pages/property-management.hbs', header);
            res.status(200)
                .send(output);
        } else {
            const header = {
                title: 'Log in',
                msg: req.cookies.message,
            };
            const output = await outputTemplate('../../views/pages/login.hbs', header);
            res.status(200)
                .send(output);
        }
    });

    // Property
    app.get('/property/:id', authentication, async(req, res) => {
        if (req.user && req.token) {
            const { properties } = await propertyList(req.user._id);
            const { property } = await propertyGet(req.params.id);
            const { catalogs } = await catalogList(req.params.id);
            const { addOns } = await addOnList(req.params.id);
            const { rooms } = await roomList(req.params.id);
            const { tenants } = await tenantList(req.params.id);
            const { bookings } = await bookingList(req.params.id);
            let vacantRooms = [];
            let occupiedRooms = [];
            for (let i = 0; i < rooms.length; i++) {
                if (rooms[i].tenant === null) {
                    vacantRooms.push(rooms[i]);
                } else if (rooms[i].tenant != null) {
                    occupiedRooms.push(rooms[i]);
                }
            };
            const header = {
                title: property.name,
                header: 'Property',
                user: req.user,
                properties,
                catalogs,
                addOns,
                property,
                rooms,
                tenants,
                bookings,
                vacantRooms: vacantRooms.length,
                occupiedRooms: occupiedRooms.length,
                totalTenants: tenants.length,
                totalBookings: bookings.length,
            };
            const output = await outputTemplate('../../views/pages/property.hbs', header);
            res.status(200)
                .send(output);
        } else {
            res.status(401)
                .redirect('/');
        }
    });

    // Profile
    app.get('/account/profile', authentication, async(req, res) => {
        if (req.user && req.token) {
            const { properties } = await propertyList(req.user._id);
            const header = {
                title: 'Profile',
                header: 'Account',
                user: req.user,
                properties,
            };
            const output = await outputTemplate('../../views/pages/profile.hbs', header);
            res.status(200)
                .send(output);
        } else {
            res.status(401)
                .redirect('/');
        }
    });

    // Security
    app.get('/account/security', authentication, async(req, res) => {
        if (req.user && req.token) {
            const { properties } = await propertyList(req.user._id);
            const header = {
                title: 'Security',
                header: 'Security',
                user: req.user,
                properties,
            };
            const output = await outputTemplate('../../views/pages/security.hbs', header);
            res.status(200)
                .send(output);
        } else {
            res.status(401)
                .redirect('/');
        }
    });
};