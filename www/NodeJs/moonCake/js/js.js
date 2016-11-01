$(function(){
    function Mylunbo(){

    }
    Mylunbo.prototype.lunbo = function(imgName, circleName, shadeName){
        var num = 0;
        var circle = 0;
        var timer = null;
        var $width = $('.lunbo>li').width();
        $('.'+circleName).children('li').click(play);

        function play(){
            num ++ ;
            circle++;
            if(num > 3){
                $('.'+imgName).css({'left':0});
                num = 1;
            }
            if(circle > 2){
                circle = 0;
            }
            $('.'+imgName).stop().animate({'left':num*-$width}, 500);
            $('.'+circleName).children('li').eq(circle).addClass('act').siblings().removeClass('act');
        }
        timer = setInterval(play, 3000);
        $('.'+shadeName).mouseover(function(){
            clearInterval(timer);
        });

        $('.'+circleName).children('li').click(function(){
            var index = $(this).index();
            circle = index;
            num = index;
            $('.'+imgName).stop().animate({'left':index*-$width}, 500);
            $(this).addClass('act').siblings().removeClass('act');
        });

        $('.'+shadeName).mouseout(function(){
            timer = setInterval(play, 3000);
        });
    };

    var lb1 = new Mylunbo();
    var lb2 = new Mylunbo();
    var lb3 = new Mylunbo();
    var lb4 = new Mylunbo();
    lb1.lunbo('lunbo1', 'circle1', 'shade1');
    lb2.lunbo('lunbo2', 'circle2', 'shade2');
    lb3.lunbo('lunbo3', 'circle3', 'shade3');
    lb4.lunbo('lunbo4', 'circle4', 'shade4');
    var $w = $(window).width();
    if($w < 1366) {
        $('.content::before,.content::after').css({'display': 'none'});
        $('.body').css({'overflow': 'hidden'});
    }

    // $('.add').click(function(){
    //     var n = parseInt($('.moonInput').val());
    //     if(n > 7) {
    //         n = 7;
    //         $(this).css({'color': '#cbc9c9', 'backgroundColor': 'rgba(203,201,201,.5)'});
    //     } else {
    //         $(this).css({'color': '#aaa', 'backgroundColor': '#440007'});
    //     }
    //
    //     $('.moonInput').val(parseInt(n + 1));
    //     $('.priceNum').text(((n + 1) * (58.2*10000))/10000 + '元');
    //     $('.number').text('×'+parseInt(n + 1));
    // });
    // $('.reduce').click(function(){
    //     $('.add').css({'color': '#aaa', 'backgroundColor': '#440007'});
    //     var n = parseInt($('.moonInput').val());
    //     if(n < 1) {
    //         n = 1
    //     }
    //     $('.moonInput').val(parseInt(n - 1));
    //     $('.priceNum').text(((n - 1) * (58.2*10000))/10000 + '元');
    //     $('.number').text('×'+parseInt(n - 1));
    // });

    function Myprice(){

    }
    Myprice.prototype.price = function(addName, reduceName, inputNmae, priceName, numName, priceNum){
        $('.' + addName).click(function(){
            var n = parseInt($('.' + inputNmae).val());
            if(n > 7) {
                n = 7;
                $(this).css({'color': '#cbc9c9', 'backgroundColor': 'rgba(203,201,201,.5)'});
            } else {
                $(this).css({'color': '#aaa', 'backgroundColor': '#440007'});
            }

            $('.' + inputNmae).val(parseInt(n + 1));
            $('.' + priceName).text(((n + 1) * (priceNum*10000))/10000 + '元');
            $('.' + numName).text('×'+parseInt(n + 1));
        });
        $('.' + reduceName).click(function(){
            $('.' + addName).css({'color': '#aaa', 'backgroundColor': '#440007'});
            var n = parseInt($('.' + inputNmae).val());
            if(n < 1) {
                n = 1
            }
            $('.' + inputNmae).val(parseInt(n - 1));
            $('.' + priceName).text(((n - 1) * (priceNum*10000))/10000 + '元');
            $('.' + numName).text('×'+parseInt(n - 1));
        });
    };
    var price1 = new Myprice();
    var price2 = new Myprice();
    var price3 = new Myprice();
    var price4 = new Myprice();
    price1.price('add1', 'reduce1', 'moonInput1', 'priceNum1', 'number1', '58.2');
    price2.price('add2', 'reduce2', 'moonInput2', 'priceNum2', 'number2', '74.3');
    price3.price('add3', 'reduce3', 'moonInput3', 'priceNum3', 'number3', '96.0');
    price4.price('add4', 'reduce4', 'moonInput4', 'priceNum4', 'number4', '133.5');


    // alert(Myprice.prototype.isPrototypeOf(price1));  // true
    // alert(price1.price == price2.price);   // true






});