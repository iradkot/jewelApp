var editArtist = function () {

}


$('.radio-div1').on('change', '.radio-inline', function () {
    var selected = $('input[name=optradio]:checked').val();
    selected = '.' + selected + 'Div';
    console.log(selected);
    $(selected).toggle();
    $(selected).siblings().hide();
});

$('.submit-button').on('click', function () {
    var email = $('.edit-artist-input').val();
    var input = $(this).siblings('input').val();
    var edit = $('input[name=optradio]:checked').val();
    console.log(email + input + edit);
});
