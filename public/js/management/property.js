$(document).ready(function () {
    // Edit and delete property
    $(document).on("click", ".js-update-property-button, .js-delete-property-button", function () {
        let _id = $(this).data('id');
        let name = $(this).data('name');
        let location = $(this).data('location');

        // Edit
        $(".js-input-property-id").val(_id);
        $(".js-input-property-name").val(name);
        $(".js-input-property-location").val(location);

        // Delete
        $(".js").val(_id);
        $("div #spanPropertyName").text(name);
        $("div #spanPropertyLocation").text(location);

        console.log(_id)
    });

    // DataTable
    $('.js-table-property').DataTable({
        "responsive": true,
        "details": false,
        "columnDefs": [
            { responsivePriority: 1, targets: 0 },
            { responsivePriority: 2, targets: 2 },
            { responsivePriority: 3, targets: 1 }
        ],
        "dom": '<"dataTables_header"fB>t<"dataTables_footer"ip>',
        "buttons": {
            dom: {
                button: {
                    tag: 'button',
                    className: 'btn'
                }
            },
            buttons: [
                {

                    className: 'btn-custom-primary m-0 text-nowrap',
                    text: `Add property`,
                    action: function (e, dt, node, config) {
                        $('.js-add-property-modal').modal('show')
                    }
                },
            ]
        },
        "pageLength": 5,
        "language": { search: '', searchPlaceholder: "Search..." },
    });

    // Remove form-control-sm to all table' search input
    $(".dataTables_filter input").removeClass('form-control-sm')

    // Recalculate on resize
    $(document).on("resize", function () {
        $($.fn.dataTable.tables(true)).DataTable().responsive.recalc();
    });
});