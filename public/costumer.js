// var chain1 = "https://cdn.shopify.com/s/files/1/1056/2378/products/31vlYRk46ML.jpg";
// var chain2 = "https://ae01.alicdn.com/kf/HTB1pqkbLXXXXXX.aXXXq6xXFXXXO/2016-Hot-New-Top-Quality-Silver-Plated-4MM-Twisted-font-b-String-b-font-Chains-font.jpg";
// var chain3 = "http://www.fashionlady.in/wp-content/uploads/2016/10/types-of-necklace-chains.jpg";
// var setting1 = "http://beadsnice.com/bn/product/201506/23/03/47140_fbx.jpg";
// var setting2 = "https://s-media-cache-ak0.pinimg.com/736x/a9/a5/8e/a9a58ecb6790a899259a4c3d4e9c8e68.jpg";
// var setting3 = "http://www.dhresource.com/260x260s/f2-albu-g3-M00-49-75-rBVaHVYqqO-AbBz8AAJ-XqgvD_k084.jpg/wholesale-10x12mm-oval-solid-14k-gold-natural.jpg";
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
});
$('.right1').click(function () {
    currentImage1 = imageSliderIndexRight(artists.chains, currentImage1);
    $("#img1").attr('src', artists.chains[currentImage1]);
});
$('.left2').click(function () {
    currentImage2 = imageSliderIndexLeft(artists.settings, currentImage2);
    $("#img2").attr('src', artists.settings[currentImage2]);
});
$('.right2').click(function () {
    currentImage2 = imageSliderIndexRight(artists.settings, currentImage2);
    $("#img2").attr('src', artists.settings[currentImage2]);
});

$(".artists-list").on('click', '.artist-choose', function () {
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
    $('.main').show();
});



