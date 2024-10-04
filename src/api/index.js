const fs = require('fs')
const path = require('path')
const routerUser = require('./routes/user')
const routerProperty = require('./routes/property')
const routerCatalog = require('./routes/catalog')
const routerAddOn = require('./routes/add-on')
const routerRoom = require('./routes/room')
const routerTenant = require('./routes/tenant')
const routerBooking = require('./routes/booking')

module.exports = async(app, handlebars) => {
    // Compile template
    const outputTemplate = async(directory, object) => {
        const template = await handlebars.compile(
            fs.readFileSync(
                path.join(__dirname, directory),
                'utf8'
            ));
        const output = await template(object);
        return output;
    };

    await require('./routes/landing')(app, outputTemplate);

    const routersArray = [routerUser, routerProperty, routerCatalog, routerAddOn, routerRoom, routerTenant, routerBooking];
    for (i = 0; i < routersArray.length; i++) {
        app.use(routersArray[i])
    };

    // 404 page
    app.get('*', async(req, res) => {
        const header = {
            title: 'Page not found'
        };
        const output = await outputTemplate('../../views/pages/404.hbs', header);
        res.status(200)
            .send(output);
    });
};