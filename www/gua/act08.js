require(["dojo/dom","dojo/on","dojo/dom-style","dojo/query","dojo/dom-class","dojo/fx","dojo/dom-attr","dojo/_base/fx","dojo/ready"],
    function(dom, on, domStyle, query, domClass, coreFx, domAttr, fx, ready){
        ready(function(){
            //        var gua = 1;
//        var imgSrc = 'images/aa.png';
//        query("images").load(function(){
            var $height = 130;
            var $width  = 270;
//            if(gua > 0){
            bodys($height,$width);
//            }
//        });
            myTab();
        });
        function myTab(){
            var n = 10;
            var timer = null;
            on(dom.byId('ruleLi'), 'click', function(){
                clearInterval(timer);
                domClass.remove(dom.byId('record'), 'act');
                domClass.add(dom.byId('rule'), 'act');
            });

            on(dom.byId('recordLi'), 'click', function(){
                domClass.remove(dom.byId('rule'), 'act');
                domClass.add(dom.byId('record'), 'act');
                clearInterval(timer);
                var h = dom.byId('scrollUl').clientHeight;
                if(h>170){
                    timer = setInterval(function(){
                        n+=1;
                        if(n>(h-120)){n=10;}
                        domStyle.set('scrollUl', 'top', -n+'px');
                    },50);
                }

            });
        }
        function bodys($height,$width){
            var img = new Image();
            var canvas = document.querySelector('canvas');
            img.addEventListener('load',function(e){
                var ctx;
                var w = $width, h = $height;
                var offsetX = canvas.offsetLeft, offsetY = canvas.offsetTop;
                var mousedown = false;
                function layer(ctx){
                    ctx.fillStyle = 'gray';
                    ctx.fillRect(0, 0, w, h);
                }
                function eventDown(e){
                    e.preventDefault();
                    mousedown=true;
                }
                function eventUp(e){
                    e.preventDefault();
                    mousedown=false;
                }
                function eventMove(e){
                    e.preventDefault();
                    if(mousedown){
                        if(e.changedTouches){
                            e=e.changedTouches[e.changedTouches.length-1];
                        }
                        var x = (e.clientX + document.body.scrollLeft || e.pageX) - offsetX-document.getElementById('gua1').offsetLeft || 0,
                            y = (e.clientY + document.body.scrollTop || e.pageY) - offsetY-document.getElementById('gua1').offsetTop || 0;
                        with(ctx){
                            beginPath();
                            arc(x, y, 15, 0, Math.PI * 2);
                            fill();
                        }
                    }
                }
                canvas.width=w;
                canvas.height=h;
                canvas.style.backgroundImage='url('+img.src+')';
                ctx=canvas.getContext('2d');
                ctx.fillStyle='#b9b9b9';
                ctx.fillRect(0, 0, w, h);
                layer(ctx);
                ctx.globalCompositeOperation = 'destination-out';
                canvas.addEventListener('touchstart', eventDown);
                canvas.addEventListener('touchend', eventUp);
                canvas.addEventListener('touchmove', eventMove);
                canvas.addEventListener('mousedown', eventDown);
                canvas.addEventListener('mouseup', eventUp);
                canvas.addEventListener('mousemove', eventMove);
            });
            img.src = 'images/aa2.png';
            (document.body.style);
        }
    });