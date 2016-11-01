$(function(){
   $('.nav li').click(function(){
        $(this).addClass('act').siblings().removeClass('act');
   });
    $('.footerNav li').click(function(){
        var index  = $(this).index();
        $(this).addClass('current').siblings().removeClass('current');
        $('.divNav div').eq(index).addClass('cur').siblings().removeClass('cur');
    });
    var lbHeight = $('.lunbo1').height();
    var lbUlHeight = $('.lunbo>ul').height();
    var n = 0;
    if(lbUlHeight > lbHeight) {
        setInterval(function(){
            n += 2;
            if(n > (lbUlHeight - lbHeight)) {
                n = 0;
            }
            $('.lunbo1>ul').css({'top':-n+'px'});
        }, 50);
    }

});