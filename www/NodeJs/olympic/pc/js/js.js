// $(function(){
//     var num = 0;
//     var numLi = $('.lunbo').length;
//     var circle = 0;
//     var timer = null;
//     $('.lunboWrap').append( $('.lunbo:first-child').clone() );
//     $('.project li').click(play);
//     function play(){
//             num ++ ;
//             circle++;
//             if(num > numLi){
//                 $('.lunboWrap').css({'left':0});
//                 num = 1;
//             }
//             if(circle > (numLi-1)){
//                 circle = 0;
//             }
//             $('.lunboWrap').stop().animate({'left':num*-1024}, 500);
//             $('.project li').eq(circle).addClass('act').siblings().removeClass('act');
//     }
//     timer = setInterval(play, 3000);
//     $('.lunboWrap').mouseover(function(){
//         clearInterval(timer);
//     });
//     $('.project li').click(function(){
//         var index = $(this).index();
//         circle = index;
//         num = index;
//         $('.lunboWrap').stop().animate({'left':index*-1024}, 500);
//         $(this).addClass('act').siblings().removeClass('act');
//     });
//
//     $('.lunboWrap').mouseout(function(){
//         timer = setInterval(play, 3000);
//     });
//
// });

(function(){
    function Slide(parentBox, childBox, circle){
        this.parentBox = parentBox;
        this.childBox = childBox;
        this.circle = circle;
    }
    Slide.prototype.slide = function(){
        var _this = this;
        var num = 0;
        var numLi = $(_this.childBox).length;
        var circle = 0;
        var $w = $(_this.childBox).get(0).offsetWidth;
        var timer = null;
            console.log($w);
        $(_this.parentBox).append( $(_this.childBox).eq(0).clone() );
        $(_this.circle).click(play);

        function play(){
            num ++ ;
            circle++;
            if(num > numLi){
                $(_this.parentBox).css({'left':0});
                num = 1;
            }
            if(circle > (numLi-1)){
                circle = 0;
            }
            $(_this.parentBox).stop().animate({'left':num*-$w}, 500);
            $(_this.circle).eq(circle).addClass('act').siblings().removeClass('act');
        }
        timer = setInterval(play, 3000);
        $(_this.parentBox).mouseover(function(){
            clearInterval(timer);
        });
        $(_this.circle).click(function(){
            var index = $(this).index();
            circle = index;
            num = index;
            $(_this.parentBox).stop().animate({'left':index*-$w}, 500);
            $(this).addClass('act').siblings().removeClass('act');
        });

        $(_this.parentBox).mouseout(function(){
            timer = setInterval(play, 3000);
        });
    };

    var s = new Slide('.lunboWrap', '.lunbo', '.project li');
    s.slide();
})();