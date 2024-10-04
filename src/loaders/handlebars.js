const fs = require('fs')
const path = require('path')

module.exports = async(handlebars, layouts) => {
    handlebars.registerHelper(layouts(handlebars))

    const partialsArray = [
        { name: 'main', directory: '../../views/layouts/main.hbs' },
        { name: 'layout', directory: '../../views/layouts/layout.hbs' },
        { name: 'layout-admin', directory: '../../views/layouts/layout-admin.hbs' },
        { name: 'modals_property', directory: '../../views/pages/_modals/property.hbs' },
        { name: 'modals_catalog', directory: '../../views/pages/_modals/catalog.hbs' },
        { name: 'modals_add_on', directory: '../../views/pages/_modals/add-on.hbs' },
        { name: 'modals_room', directory: '../../views/pages/_modals/room.hbs' },
        { name: 'modals_tenant', directory: '../../views/pages/_modals/tenant.hbs' },
        { name: 'modals_booking', directory: '../../views/pages/_modals/booking.hbs' },
        { name: 'modals_profile_photo', directory: '../../views/pages/_modals/profile-photo.hbs' },
        { name: 'table_property', directory: '../../views/pages/_DataTables/property.hbs' },
        { name: 'table_catalog', directory: '../../views/pages/_DataTables/catalog.hbs' },
        { name: 'table_add_on', directory: '../../views/pages/_DataTables/add-on.hbs' },
        { name: 'table_room', directory: '../../views/pages/_DataTables/room.hbs' },
        { name: 'table_tenant', directory: '../../views/pages/_DataTables/tenant.hbs' },
        { name: 'table_booking', directory: '../../views/pages/_DataTables/booking.hbs' }
    ];

    // Register partials in the array
    for (i = 0; i < partialsArray.length; i++) {
        handlebars.registerPartial(partialsArray[i].name, fs.readFileSync(path.join(__dirname, partialsArray[i].directory), 'utf8'));
    };
}