var STORAGE_ID = 'jewel-app';
var saveToLocalStorage = function () {
    localStorage.setItem(STORAGE_ID, JSON.stringify(sendsLeft));
    console.log(sendsLeft);
}
var getFromLocalStorage = function () {
    return JSON.parse(localStorage.getItem(STORAGE_ID) || '2');
}
var sendsLeft = getFromLocalStorage();
$('#sendsLeft').append(sendsLeft);


$('#head-description').hide();
$(document).ready(function () {
    $('h1').addClass('animated tada');
    $('#head-description').show();
    $('#head-description').addClass('animated bounceInUp')
})
var currentImage1 = 0;
var currentImage2 = 0;
function imageSliderIndexRight(arr, current) {
    if (current === arr.length - 1) {
        return 0;
    }
    else {
        current++;
        return current;
    }
}
function imageSliderIndexLeft(arr, current) {
    if (current === 0) {
        return arr.length - 1;
    }
    else {
        current--;
        return current;
    }
}
var artists = [];//for getting the array of atrists
var artists_arr = [];
$.ajax({
    url: "/artists",
    method: "Get"
}).done(function (data) {
    // artists = data[0];
    artists_arr = data;
    /// now putting all artists
    var source = $('#artists-template').html();
    var template = Handlebars.compile(source);
    for (var i = 0; i < artists_arr.length; i++) {
        var newHTML = template(artists_arr[i]);
        $('.artists-list').append(newHTML);
    }
}).fail(function (jqXHR, textStatus) {
    console.log(textStatus);
});




$('.left1').click(function () {
    currentImage1 = imageSliderIndexLeft(artists.chains, currentImage1);
    $("#img1").attr('src', artists.chains[currentImage1]);
    $('#img1').addClass('animated flipInX');
    setTimeout(function () {
        $('#img1').removeClass('animated flipInX');
    }, 1000);
});
$('.right1').click(function () {
    currentImage1 = imageSliderIndexRight(artists.chains, currentImage1);
    $("#img1").attr('src', artists.chains[currentImage1]);
    $('#img1').addClass('animated flipInX');
    setTimeout(function () {
        $('#img1').removeClass('animated flipInX');
    }, 2000);
});
$('.left2').click(function () {
    currentImage2 = imageSliderIndexLeft(artists.settings, currentImage2);
    $("#img2").attr('src', artists.settings[currentImage2]);
    $('#img2').addClass('animated flipInX');
    setTimeout(function () {
        $('#img2').removeClass('animated flipInX');
    }, 1000);
});
$('.right2').click(function () {
    currentImage2 = imageSliderIndexRight(artists.settings, currentImage2);
    $("#img2").attr('src', artists.settings[currentImage2]);
    $('#img2').addClass('animated flipInX');
    setTimeout(function () {
        $('#img2').removeClass('animated flipInX');
    }, 1000);
});




$(".artists-list").on('click', '.artist-choose', function () {
    // animating artist choose boxes
    $(this).closest('.profile_box').addClass('box');
    $(this).closest('.profile_box').siblings().removeClass('box');
    //animating the images "refresh"
    $('#img1').addClass('animated lightSpeedIn');
    setTimeout(function () {
        $('#img1').removeClass('animated lightSpeedIn');
    }, 1000);
    $('#img2').addClass('animated lightSpeedIn');
    setTimeout(function () {
        $('#img2').removeClass('animated lightSpeedIn');
    }, 1000);


    var id = $(this).data().id;
    $('.artist-info').empty();
    for (var i = 0; i < artists_arr.length; i++) {
        if (artists_arr[i]._id === id) {
            artists = artists_arr[i];
            $('.artist-info').append("<h3>" + artists.name + "</h3>");
            $('.artist-info').append("<h5>" + artists.bio + "</h5>");
            break;
        }
    }
    $('body').css("background-color", artists.theme);
    $("#img1").attr('src', artists.chains[currentImage1]);
    $("#img2").attr('src', artists.settings[currentImage2]);
    $('.main').show();
    updateScores();
});
var order = {};
$('#send').click(function () {
    // if (sendsLeft == 0) {
    //     alert("you reached your daily limit");
    //     setTimeout(function () {
    //         sendsLeft = 2;
    //     }, 10000);
    //     return;
    // }
    
    // sendsLeft--;
    // $('#sendsLeft').empty();
    // $('#sendsLeft').append(sendsLeft);
    order.customer_name = $('#cost_name').val();
    $('#cost_name').val("");
    order.customer_email = $('#cost_email').val();
    $('#cost_email').val("");
    order.customer_info = $('#cost_text').val();
    $('#cost_text').val('');
    order.artist_email = artists.email;
    order.chain = $("#img1").attr('src');
    order.setting = $("#img2").attr('src');

    var index = findArtistByEmail(artists.email);
    artists_arr[index].score++;
    updateScores();

    $.ajax({
        url: "/order",
        method: "POST",
        data: order
    }).done(function (data) {
        alert("ordered");
    }).fail(function (jqXHR, textStatus) {
        console.log(textStatus);
    });
    console.log(order);
})



function appendTopArtists(arr) {
    $('.top_artists').empty();
    for (var i = 0; i < 3; i++) {
        $('.top_artists').append("<li> name: " + arr[i].name + ", points: " + arr[i].score + "</li>");
    }
}

function bubble(arr) {
    var len = arr.length;

    for (var i = 0; i < len; i++) {
        for (var j = 0; j < len - i - 1; j++) { // this was missing
            if (arr[j].score < arr[j + 1].score) {
                // swap
                var temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}

function updateScores() {
    if (artists_arr.length > 2) {
        var sorted_arr = bubble(artists_arr);
        appendTopArtists(sorted_arr);
    }
}
function findArtistByEmail(email){
    for (var i = 0; i < artists_arr.length; i++) {
        var element = artists_arr[i];
        if (email===element.email){
            return i;
        }
    }
}
