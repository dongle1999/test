$('document').ready(function () {
    // Set initial status
    $('.js-form--user-login')
        .data('email', 'failed')
        .data('password', 'failed')

    const error = '<svg class="mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FF0000" width="16px" height="16px"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>'

    const emailValidation = () => {
        let email = $('.js-form-input-email').val()

        if (email != '') {
            $('.js-email-indicator')
                .html('')
            $('.js-form--user-login')
                .data('email', 'passed')
        } else {
            $('.js-email-indicator')
                .html(error + 'Cannot be empty')
            $('.js-form--user-login')
                .data('email', 'failed')
        }
    };

    const passwordValidation = () => {
        let password = $('.js-form-input-password').val()

        if (password != '') {
            $('.js-password-indicator')
                .html('')
            $('.js-form--user-login')
                .data('password', 'passed')
        } else {
            $('.js-form--user-login')
                .data('password', 'failed')
            $('.js-password-indicator')
                .html(error + 'Cannot be empty')
        }
    };

    // Form validation
    $('.js-form--user-login').on('submit', function () {
        let emailCheck = $('.js-form--user-login').data('email')
        let passwordCheck = $('.js-form--user-login').data('password')

        if (emailCheck == 'failed' || passwordCheck == 'failed') {
            emailValidation()
            passwordValidation()

            return false;
        }

        return true;
    });

    // Email validation
    $('.js-form-input-email').on('keyup', function () {
        emailValidation()
    });

    // Password validation
    $('.js-form-input-password').on('keyup', function () {
        passwordValidation()
    });
});