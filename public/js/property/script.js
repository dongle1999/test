$(document).ready(function () {
    // Change active tabs based on hash value
    let current_tab = location.hash.slice(1)
    $(`.js-property-nav-tab a[href='${current_tab}']`).tab('show')

    // Delete hash value on url
    setTimeout(function () {
        history.replaceState(null, null, ' ');
    }, 20000)

    // Catalog
    $(document).on("click", ".js-update-catalog-button, .js-delete-catalog-button", function () {
        let _id = $(this).data('id');
        let name = $(this).data('name');
        let rate = $(this).data('rate');

        // Pass data to catalog modal
        $(".js-input-catalog-id").val(_id);
        $(".js-input-catalog-name").val(name);
        $(".js-input-catalog-rate").val(rate);
    });

    // Add-on
    $(document).on("click", ".js-update-addOn-button, .js-delete-addOn-button", function () {
        let _id = $(this).data('id');
        let name = $(this).data('name');
        let rate = $(this).data('rate');
        let type = $(this).data('type');

        // Pass data to add-on modal
        $(".js-input-addOn-id").val(_id);
        $(".js-input-addOn-name").val(name);
        $(".js-input-addOn-rate").val(rate);
        $(".js-input-addOn-type").val(type);
    });

    // Room
    $(document).on("click", ".js-update-room-button, .js-delete-room-button", function () {
        let _id = $(this).data('id');
        let name = $(this).data('name');
        let floor = $(this).data('floor');
        let catalogid = $(this).data('catalogid');
        let catalogname = $(this).data('catalogname');
        let catalograte = $(this).data('catalograte');
        let status = $(this).data('status');

        // Pass data to room modal
        $(".js-input-room-id").val(_id);
        $(".js-input-room-name").val(name);
        $(".js-input-room-floor").val(floor);
        $(".js-input-room-catalog-name").val(catalogname);
        $(".js-input-room-catalog-rate").val(catalograte);
        $(".js-input-room-status").val(status);
        $(`.js-input-room-catalog option[value=${catalogid}]`)
            .prop('selected', true)
            .text(catalogname + ' - ' + catalograte + ' (Current)')
    });

    // Tenant
    $(document).on("click", ".js-update-tenant-button, .js-delete-tenant-button", function () {
        let _id = $(this).data('id');
        let first_name = $(this).data('firstname');
        let last_name = $(this).data('lastname');
        let birthday = $(this).data('birthday');
        let mobile = $(this).data('mobile');
        let email = $(this).data('email');
        let room = $(this).data('room');
        let roomname = $(this).data('roomname');
        let roomfloor = $(this).data('roomfloor');

        // Pass data to tenant modal
        $(".js-input-tenant-id").val(_id);
        $(".js-input-tenant-first-name").val(first_name);
        $(".js-input-tenant-last-name").val(last_name);
        $(".js-input-tenant-birthday").val(birthday);
        $(".js-input-tenant-mobile").val(mobile);
        $(".js-input-tenant-email").val(email);
        $(".js-input-tenant-current-room").val(room);
        $(".js-input-tenant-room").val(roomname + ' - Floor ' + roomfloor);
        $(`.js-select-tenant-room option[value=${room}]`)
            .prop({ 'disabled': false, 'selected': true })

        let selectedOption = $('.js-select-tenant-room option:selected').text()

        if (!selectedOption.includes('Current')) {
            $('.js-select-tenant-room option:selected')
                .text($(`.js-select-tenant-room option[value=${room}]`).text() + ' (Current)');
        }
    });

    // Booking
    $(document).on("click", ".js-accept-booking-button, .js-decline-booking-button", function () {
        let _id = $(this).data('id');
        let first_name = $(this).data('firstname');
        let last_name = $(this).data('lastname');
        let birthday = $(this).data('birthday');
        let mobile = $(this).data('mobile');
        let email = $(this).data('email');
        let room = $(this).data('room');

        // Pass data to accept-booking modal
        $(".js-input-booking-id").val(_id);
        $(".js-input-booking-first-name").val(first_name);
        $(".js-input-booking-last-name").val(last_name);
        $(".js-input-booking-birthday").val(birthday);
        $(".js-input-booking-mobile").val(mobile);
        $(".js-input-booking-email").val(email);
        $(".js-input-booking-room").val(room);
    });

    // Delete 'current' on modal close
    $(document).on("hide.bs.modal", "#editTenantModal", function () {
        let room = $('.js-select-tenant-room option:selected').text();

        $(`.js-select-tenant-room .occupied`)
            .prop({ 'disabled': true });
        $('.js-select-tenant-room option:selected')
            .text(room.replace(' (Current)', ''))
            .prop({ 'selected': false });
    });
});