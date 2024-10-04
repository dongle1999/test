$('document').ready(function () {
    // Set initial status
    $('.js-form--user-signup')
        .data('username', 'failed')
        .data('email', 'failed')
        .data('password', 'failed')

    const error = '<svg class="mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FF0000" width="16px" height="16px"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>'
    const success = '<svg class="mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#00FF00" width="16px" height="16px"><path d="M0 0h24v24H0V0zm0 0h24v24H0V0z" fill="none"/><path d="M16.59 7.58L10 14.17l-3.59-3.58L5 12l5 5 8-8zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>'

    const usernameValidation = () => {
        let username = $('.js-form-input-username').val();

        $.ajax({
            url: '/api/user/signup/username_check',
            type: 'post',
            data: {
                'username': username
            },
            success: function (res) {
                if (res.result === 'taken') {
                    $('.js-form--user-signup')
                        .data('username', 'failed')
                    $('.js-username-indicator')
                        .removeClass('msg-status--success')
                        .addClass('msg-status--error')
                        .html(error + 'Already taken')
                } else if (res.result === 'available' && username != '') {
                    $('.js-form--user-signup')
                        .data('username', 'passed')
                    $('.js-username-indicator')
                        .removeClass('msg-status--error')
                        .addClass('msg-status--success')
                        .html(success + 'Available')
                } else if (username === '') {
                    $('.js-username-indicator')
                        .removeClass('msg-status--success')
                        .addClass('msg-status--error')
                        .html(error + 'Cannot be empty')
                } else {
                    $('.js-form--user-signup')
                        .data('username', 'failed')
                    $('.js-username-indicator')
                        .removeClass('msg-status--success msg-status--error')
                        .html('')
                }
            }
        });
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

        $.ajax({
            url: '/api/user/signup/email_check',
            type: 'post',
            data: {
                'email': email,
            },
            success: function (res) {
                if (res.result === 'taken' || !isValidEmail(email) && email != '') {
                    $('.js-form--user-signup')
                        .data('email', 'failed')

                    if (!isValidEmail(email)) {
                        $('.js-email-indicator')
                            .removeClass('msg-status--success')
                            .addClass('msg-status--error')
                            .html(error + 'Invalid email')
                    } else {
                        $('.js-email-indicator')
                            .removeClass('msg-status--success')
                            .addClass('msg-status--error')
                            .html(error + 'Already taken')
                    }
                } else if (res.result === 'available' && isValidEmail(email)) {
                    $('.js-form--user-signup')
                        .data('email', 'passed')
                    $('.js-email-indicator')
                        .removeClass('msg-status--error')
                        .addClass('msg-status--success')
                        .html(success + 'Available')
                } else if (email === '') {
                    $('.js-email-indicator')
                        .removeClass('msg-status--success')
                        .addClass('msg-status--error')
                        .html(error + 'Cannot be empty')
                } else {
                    $('.js-form--user-signup')
                        .data('email', 'failed')
                    $('.js-email-indicator')
                        .removeClass('msg-status--success msg-status--error')
                        .html('')
                }
            }
        });
    }

    const passwordValidation = () => {
        let password = $('.js-form-input-password').val()

        if (password != '' && password.length >= 6) {
            $('.js-form--user-signup')
                .data('password', 'passed')
            $('.js-password-indicator')
                .removeClass('msg-status--error')
                .addClass('msg-status--success')
                .html(success + 'Must be at least 6 characters')
        } else if (password === '') {
            $('.js-password-indicator')
                .removeClass('msg-status--success')
                .addClass('msg-status--error')
                .html(error + 'Cannot be empty')
        } else {
            $('.js-form--user-signup')
                .data('password', 'failed')
            $('.js-password-indicator')
                .addClass('msg-status--error')
                .html(error + 'Must be at least 6 characters')
        }
    }


    // Form validation
    $('.js-form--user-signup').on('submit', function () {
        let usernameCheck = $('.js-form--user-signup').data('username')
        let emailCheck = $('.js-form--user-signup').data('email')
        let passwordCheck = $('.js-form--user-signup').data('password')

        if (usernameCheck == 'failed' || emailCheck == 'failed' || passwordCheck == 'failed') {
            usernameValidation()
            emailValidation()
            passwordValidation()

            return false;
        }

        return true;
    });

    // Username validation
    $('.js-form-input-username').on('keyup', function () {
        usernameValidation()
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