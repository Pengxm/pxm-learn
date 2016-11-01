require(["dojo/dom","dojo/on","dojo/dom-style","dojo/query","dojo/dom-class","dojo/fx","dojo/dom-attr","dojo/_base/fx","dojo/request/script","dojo/json","dojo/ready"],
    function(dom, on, domStyle, query, domClass, coreFx, domAttr, fx, script, JSON, ready){
        ready(function(){
            myTab();
            query('.egg').on('click', function(){
                domStyle.set('beat', 'display', 'block');
                setTimeout(function(){
                    domStyle.set('beat', 'display', 'none');
                    dom.byId('egg').src = 'images/egg2_2.png';
                    domClass.add('prize', 'act');
                    domClass.add('coin', 'act');
                },1000);
            });
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
    });