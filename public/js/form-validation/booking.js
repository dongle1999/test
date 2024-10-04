$(document).ready(function () {
    $(document).on('keypress', 'form', function (e) {
        var code = e.keyCode || e.which;
        if (code == 13) {
            e.preventDefault();
            return false;
        }
    });

    // Set initial status
    $('.js-form--booking')
        .data('firstName', 'failed')
        .data('lastName', 'failed')
        .data('birthday', 'failed')
        .data('mobile', 'failed')
        .data('email', 'failed')
        .data('room', 'failed')

    const error = '<svg class="mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#74070E" width="18px" height="18px"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>'

    // First tab validation

    const firstNameValidation = () => {
        let firstName = $('.js-form-input-firstName').val()

        if (firstName == (null || '')) {
            $('.js-form--booking')
                .data('firstName', 'failed')
            $('.js-firstName-indicator')
                .removeClass('msg-status--success')
                .addClass('msg-status--error2')
                .html(error + 'Cannot be empty')
        } else {
            $('.js-form--booking')
                .data('firstName', 'passed')
            $('.js-firstName-indicator')
                .removeClass('msg-status--success msg-status--error2')
                .html('')
        }
    }

    const lastNameValidation = () => {
        let lastName = $('.js-form-input-lastName').val()

        if (lastName == (null || '')) {
            $('.js-form--booking')
                .data('lastName', 'failed')
            $('.js-lastName-indicator')
                .removeClass('msg-status--success')
                .addClass('msg-status--error2')
                .html(error + 'Cannot be empty')
        } else {
            $('.js-form--booking')
                .data('lastName', 'passed')
            $('.js-lastName-indicator')
                .removeClass('msg-status--success msg-status--error2')
                .html('')
        }
    }

    const birthdayValidation = () => {
        let birthday = $('.js-form-input-birthday').val()

        if (birthday == (null || '')) {
            $('.js-form--booking')
                .data('birthday', 'failed')
            $('.js-birthday-indicator')
                .removeClass('msg-status--success')
                .addClass('msg-status--error2')
                .html(error + 'Invalid date')
        } else {
            $('.js-form--booking')
                .data('birthday', 'passed')
            $('.js-birthday-indicator')
                .removeClass('msg-status--success msg-status--error2')
                .html('')
        }
    }

    const mobileValidation = () => {
        let mobile = $('.js-form-input-mobile').val()

        if (mobile.length == 11) {
            $('.js-form--booking')
                .data('mobile', 'passed')
            $('.js-mobile-indicator')
                .removeClass('msg-status--success msg-status--error2')
                .html('')
        } else {
            $('.js-form--booking')
                .data('mobile', 'failed')
            $('.js-mobile-indicator')
                .removeClass('msg-status--success')
                .addClass('msg-status--error2')
                .html(error + 'Must be an 11-digit mobile number')
        }
    }

    const emailValidation = () => {
        let email = $('.js-form-input-email').val()

        function isValidEmail(email) {
            let regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (regex.test(email)) {
                return true;
            }
            return false;
        }

        // Email validity check
        if (!isValidEmail(email)) {
            $('.js-form--booking')
                .data('email', 'failed')
            $('.js-email-indicator')
                .removeClass('msg-status--success')
                .addClass('msg-status--error2')
                .html(error + 'Invalid email')
        } else {
            $('.js-form--booking')
                .data('email', 'passed')
            $('.js-email-indicator')
                .removeClass('msg-status--success msg-status--error2')
                .html('')
        }

    };

    const roomValidation = () => {
        if ($('input[name=catalog]:checked').length > 0) {
            $('.js-form--booking')
                .data('room', 'passed')
            $('.js-room-indicator')
                .removeClass('msg-status--success msg-status--error2')
                .html('')
        } else {
            $('.js-form--booking')
                .data('room', 'failed')
            $('.js-room-indicator')
                .removeClass('msg-status--success')
                .addClass('msg-status--error2')
                .html(error + 'Please choose a room type')
        }
    }

    // First name validation
    $('.js-form-input-firstName').on('keyup', function () {
        firstNameValidation()
    });

    // Last name validation
    $('.js-form-input-lastName').on('keyup', function () {
        lastNameValidation()
    });

    // Birthday validation
    $('.js-form-input-birthday').on('keyup', function () {
        birthdayValidation()
    });

    // Mobile validation
    $('.js-form-input-mobile').on('keyup', function () {
        mobileValidation()
    });

    // Mobile validation
    $('.js-form-input-email').on('keyup', function () {
        emailValidation()
    });

    // Room validation
    $('.js-form-input-room').on('change', function () {
        roomValidation()
    });

    // First tab
    $('.js-ftab-btn-next').on('click', function () {
        let firstNameCheck = $('.js-form--booking').data('firstName')
        let lastNameCheck = $('.js-form--booking').data('lastName')
        let birthdayCheck = $('.js-form--booking').data('birthday')
        let mobileCheck = $('.js-form--booking').data('mobile')
        let emailCheck = $('.js-form--booking').data('email')

        console.log(firstNameCheck)

        if (firstNameCheck == 'passed' && lastNameCheck == 'passed' && birthdayCheck == 'passed' && mobileCheck == 'passed' && emailCheck == 'passed') {
            $('.js-ftab')
                .addClass('d-none')
            $('.js-stab')
                .removeClass('d-none')
        } else {
            firstNameValidation()
            lastNameValidation()
            birthdayValidation()
            mobileValidation()
            emailValidation()
        }

    })

    // Second tab
    $('.js-ftab-btn-prev').on('click', function () {
        $('.js-stab')
            .addClass('d-none')
        $('.js-ftab')
            .removeClass('d-none')
    })

    $('.js-stab-btn-next').on('click', function () {
        let roomCheck = $('.js-form--booking').data('room')

        if (roomCheck == 'passed') {
            let name = $('.js-form-input-firstName').val() + ' ' + $('.js-form-input-lastName').val()
            let birthday = $('.js-form-input-birthday').val()
            let mobile = $('.js-form-input-mobile').val()
            let email = $('.js-form-input-email').val()

            $('.js-td-name').text(name)
            $('.js-td-birthday').text(birthday)
            $('.js-td-mobile').text(mobile)
            $('.js-td-email').text(email)

            $('.js-stab')
                .addClass('d-none')
            $('.js-ttab')
                .removeClass('d-none')
        } else {
            roomValidation()
        }
    })

    // Third tab
    $('.js-ttab-btn-prev').on('click', function () {
        $('.js-ttab')
            .addClass('d-none')
        $('.js-stab')
            .removeClass('d-none')
    })
})

// Catalog detection
function catalogSelected(element) {
    let selected = element.id

    $('.radio-label .card')
        .attr('style', 'background-color: transparent !important;')
    $(`#${selected} .card`)
        .attr('style', 'background-color: #6c7789 !important;')

    $('.js-catalog-name')
        .text($(element).attr('data-name'))
    $('.js-catalog-rate')
        .text('P' + $(element).attr('data-rate') + '/month')
}