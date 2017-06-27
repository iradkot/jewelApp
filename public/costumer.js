var chain1 = '<img src="https://cdn.shopify.com/s/files/1/1056/2378/products/31vlYRk46ML.jpg" class="img-responsive" alt="" />';
var chain2 = '<img src="https://ae01.alicdn.com/kf/HTB1pqkbLXXXXXX.aXXXq6xXFXXXO/2016-Hot-New-Top-Quality-Silver-Plated-4MM-Twisted-font-b-String-b-font-Chains-font.jpg"  class="img-responsive" alt="" />';
var chain3 = '<img src="http://www.fashionlady.in/wp-content/uploads/2016/10/types-of-necklace-chains.jpg"  class="img-responsive" alt="" />'; 
var chain_arr = [chain1, chain2, chain3];
var setting1 = '<img src="http://beadsnice.com/bn/product/201506/23/03/47140_fbx.jpg"  class="img-responsive" alt="" />'; 
var setting2 = '<img src="https://s-media-cache-ak0.pinimg.com/736x/a9/a5/8e/a9a58ecb6790a899259a4c3d4e9c8e68.jpg"  class="img-responsive" alt="" />'; 
var setting3 = '<img src="http://www.dhresource.com/260x260s/f2-albu-g3-M00-49-75-rBVaHVYqqO-AbBz8AAJ-XqgvD_k084.jpg/wholesale-10x12mm-oval-solid-14k-gold-natural.jpg"  class="img-responsive" alt="" />'; 
var setting_arr = [setting1, setting2, setting3];
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

$(".bounding-box1").append(chain_arr[currentImage1]);
$(".bounding-box2").append(setting_arr[currentImage2]);
console.log(setting_arr);



$('.left1').click(function(){
    currentImage1 = imageSliderIndexLeft(chain_arr, currentImage1);
    $(".bounding-box1").empty();
    $(".bounding-box1").append(chain_arr[currentImage1]);
});
$('.right1').click(function(){
    currentImage1 = imageSliderIndexRight(chain_arr, currentImage1);
    $(".bounding-box1").empty();
    $(".bounding-box1").append(chain_arr[currentImage1]);
});
$('.left2').click(function(){
    currentImage2 = imageSliderIndexLeft(setting_arr, currentImage2);
    $(".bounding-box2").empty();
    $(".bounding-box2").append(setting_arr[currentImage2]);
});
$('.right2').click(function(){
    currentImage2 = imageSliderIndexRight(setting_arr, currentImage2);
    $(".bounding-box2").empty();
    $(".bounding-box2").append(setting_arr[currentImage2]);
    console.log(currentImage2);
});



