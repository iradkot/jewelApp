// Handles Errors
var errorHandler = function (err, status) {
    console.error(status);
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


$('.remove-artist-button').on('click', function () {
    var artistEmail = $('.remove-artist-input').val();
    deleteArtist(artistEmail);
    $('.remove-artist-input').val('');
})