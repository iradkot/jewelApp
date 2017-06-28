$(document).ready(function(){
    $('.slider_image').hover(function() {
        $(this).addClass('transition');
    
    }, function() {
        $(this).removeClass('transition');
    });
});