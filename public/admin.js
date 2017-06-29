// Handles Errors
var errorHandler = function (err, status) {
    console.error(status);
}

$.get('admin.hbs', function (source) {
    template = Handlebars.compile(source);
    render();
}, 'html');

var artistList = [];

// Get Artist Data
var fetch = function () {
    $.ajax({
        method: "GET",
        url: '/artists',
        success: function (data) {
            artistList = data;
            render();
        },
        error: errorHandler
    });
}

var render = function () {
    $('.artist-list').empty();
    var newHTML = template(artistList);
    $('.artist-list').append(newHTML);
}

var deleteArtist = function (artistEmail) {
    $.ajax({
        type: "DELETE",
        url: '/artist/' + artistEmail,
        success: function (data) {
            alert('Successfully Removed ' + artistEmail + ' from the DB');
        },
        error: errorHandler
    })
}

fetch(); 

$('.remove-artist-button').on('click', function () {
    var artistEmail = $('.remove-artist-input').val();
    deleteArtist(artistEmail);
    $('.remove-artist-input').val('');
})