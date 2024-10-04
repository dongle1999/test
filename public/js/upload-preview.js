// Upload profile photo preview
function uploadPreview(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            $('.js-upload-preview')
                .attr('style', 'display: flex; background-image: url(' + e.target.result + ');');
        };
        reader.readAsDataURL(input.files[0]);
    }
}