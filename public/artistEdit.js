// Handles Errors
var errorHandler = function (err, status) {
    console.error(status);
}

// Fake Put Request
var editArtist = function (email, option, input) {
    $.ajax({
        type: "POST",
        url: '/artist/' + email + '/option/' + option,
        data: input,
        success: function (data) { },
        error: errorHandler
    });
}

$('.radio-div1').on('change', '.radio-inline', function () {
    var selected = $('input[name=optradio]:checked').val();
    selected = '.' + selected + 'Div';
    $(selected).toggle();
    $(selected).siblings().hide();
});

$('.submit-button').on('click', function () {
    var email = $('.edit-artist-input').val();
    var option = $('input[name=optradio]:checked').val();
    var input = { text: $(this).siblings('input').val() };
    var selected = $('input[name=optradio]:checked').val();
    if (selected === 'theme') {
        input = { text: $('input[class=optradio2]:checked').val() };
    }
    editArtist(email, option, input);
});
