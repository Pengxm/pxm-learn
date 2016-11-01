$(function(){
    var num = 0;
    var numLi = $('.lunbo').length;
    var circle = 0;
    var timer = null;
    var $width = $(window).width();
    $('.lunboWrap').append( $('.lunbo:first-child').clone() );
    $('.project li').click(play);
    function play(){
            num ++ ;
            circle++;
            if(num > numLi){
                $('.lunboWrap').css({'left':0});
                num = 1;
            }
            if(circle > (numLi-1)){
                circle = 0;
            }
            $('.lunboWrap').stop().animate({'left':num*-$width}, 500);
            $('.project li').eq(circle).addClass('act').siblings().removeClass('act');
    }
    timer = setInterval(play, 3000);

    $('.project li').click(function(){
        var index = $(this).index();
        circle = index;
        num = index;
        $('.lunboWrap').stop().animate({'left':index*-$width}, 500);
        $(this).addClass('act').siblings().removeClass('act');
    });



});