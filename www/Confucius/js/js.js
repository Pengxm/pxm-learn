(function(){
    $(function(){
        labelClick();
    });
    function labelClick(){
        $('label.person').click(function(){
            $('.dizi').removeClass('act');
            $(this).children('span').addClass('act');
        });
        $('.bodyWrap label').bind('click', function(){
            $(this).siblings().children('span').removeClass('act');
            $(this).children('span').addClass('act');
        });
    }
    var oDiv = document.getElementById('lunbo');
    var oUl = document.getElementById('lbWrap');
    document.addEventListener("DOMContentLoaded",function(){
        var scroller=new Scroller(oDiv, oUl, 1);
        scroller.start();
    });
    $('.close').click(function(){
        $('.popup').hide(500);
    });
    function Popup(){

    }
    Popup.prototype.setPopup = function(classList, txt){

        $(classList).html(txt);
        $(classList).css({'width': '500px', 'line-height':'1.8'});
        var popupHeight = $('.popup').get(0).clientWidth;
        var popupWidth = $('.popup').width();
        $('.popup').css({'margin-left': -popupWidth/2+'px', 'margin-top': -popupHeight/2+'px'});
        $('.button').click(function(){
            $('.popup').hide(500);
        })
    };
    window.Popup = Popup;

    $('.btn').on('click', function(){

        if($('.body .act').length == 8){
            if($('.dizi').hasClass('act')){
                var arr = [];
                for(var i = 0; i < $('.correct').length; i ++){
                    if($('.correct').eq(i).hasClass('act')){
                        arr.push(i);
                    }
                }
                if(arr.length == 8){
                    $('.popup').fadeIn(500).css('text-align', 'left');
                    var p1 = new Popup();
                    p1.setPopup('.popup p', '恭喜！您全部答对，获得<span>100</span>邮币！已加到您账号，<br/>点击查看 <a href="recommend.shtml?act=task&header_type=recommend">其他活动</a>');

                } else {
                    $('.popup').fadeIn(500).css('text-align', 'left');
                    var p2 = new Popup();
                    p2.setPopup('.popup p', '您获得<span>5</span>邮币奖励！已加到账号，点击查看<a href="recommend.shtml?act=task&header_type=recommend">其他活动</a><br/>正确答案：<br/>1《论语》; 2、“仁”“礼”; 3、思而不学则怠; 4、勿施于人; 5、必先利其器; 6、必有近忧; 7、患不知人也; 8、来者犹可追');
                }

            } else {
                $('.popup').fadeIn(500).css('text-align', 'center');
                var p3 = new Popup();
                p3.setPopup('.popup p', '您好，答题前请先选择一个人物！');
            }
        } else {
            $('.popup').fadeIn(500).css('text-align', 'center');
            var p4 = new Popup();
            p4.setPopup('.popup p', '抱歉！您还没有答完题！');
        }
    });

})();
