var image1 = '<img src="http://fiercedragjewels.com/wp-content/uploads/2013/11/image221-fierce-drag-jewels1.png" class="img-responsive" alt="" />';
var image2 = '<img src="https://n3.sdlcdn.com/imgs/a/z/4/Sukkhi-Trendy-Gold-Plated-Australian-SDL022231484-1-2ac46.jpg"  class="img-responsive" alt="" />';
var image3 = '<img src="https://www.swarovski.com/is-bin/intershop.static/WFS/SCO-Media-Site/-/-/publicimages/CG/B2C/PROD/600/Swarovski-Gisele-Necklace-Large-Green-5266287-W600.jpg"  class="img-responsive" alt="" />'; 
var arr1 = [image1, image2, image3];
var currentImage1 = 0;
var currentImage2 = 0;

function imageSliderIndexRight(arr, current){
    if (current===arr.length-1){
        return 0;
    }
    else{
        current++;
        return current;
    }
}
function imageSliderIndexLeft(arr, current){
    if (current===0){
        return arr.length-1;
    }
    else{
        current--;
        return current;
    }
}

$(".bounding-box1").append(arr1[currentImage1]);
$(".bounding-box2").append(arr1[currentImage2]);



$('.left1').click(function(){
    currentImage1 = imageSliderIndexLeft(arr1, currentImage1);
    $(".bounding-box1").empty();
    $(".bounding-box1").append(arr1[currentImage1]);
});
$('.right1').click(function(){
    currentImage1 = imageSliderIndexRight(arr1, currentImage1);
    $(".bounding-box1").empty();
    $(".bounding-box1").append(arr1[currentImage1]);
});
$('.left2').click(function(){
    currentImage2 = imageSliderIndexLeft(arr1, currentImage2);
    $(".bounding-box2").empty();
    $(".bounding-box2").append(arr1[currentImage2]);
});
$('.right2').click(function(){
    currentImage2 = imageSliderIndexRight(arr1, currentImage2);
    $(".bounding-box2").empty();
    $(".bounding-box2").append(arr1[currentImage2]);
    console.log(currentImage2);
});



