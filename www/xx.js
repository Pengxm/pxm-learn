require(["dojo/dom","dojo/on","dojo/dom-style","dojo/query","dojo/dom-class","dojo/fx","dojo/dom-attr","dojo/_base/fx","dojo/request/script","dojo/json","dojo/ready"],
    function(dom, on, domStyle, query, domClass, coreFx, domAttr, fx, script, JSON, ready){
        var click = false;
        var prizeList = '';
        ready(function(){
            myTab();
            var sureBtn = document.getElementById('sureBtn');
            prizeList = document.getElementById('sureBtn');
            myLi = 2;
            window.onload=function(){
                lottery.init('lottery');
                on(dom.byId('start'), 'click', function(){
                    if (click) {
                        return false;
                    }else{
                        lottery.speed = 100;
                        roll();
                        click = true;
                        sureBtn.onclick = function(){
                            Slider.slideUp(popup, 300);
                        };
                        return false;
                    }
                });
            };
        });
        var myTab = function(){
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
                };

            });
        };
        var lottery={
            index:-1,	//当前转动到哪个位置，起点位置
            count:0,	//总共有多少个位置
            timer:0,	//setTimeout的ID，用clearTimeout清除
            speed:20,	//初始转动速度
            times:0,	//转动次数
            cycle:50,	//转动基本次数：即至少需要转动多少次再进入抽奖环节
            prize:-1,	//中奖位置
            init:function(){
                if (query(".lottery-unit").length>0) {
                    $lottery = dom.byId("#lottery");
                    $units = query(".lottery-unit");
                    this.obj = $lottery;
                    this.count = $units.length;
                    query(".lottery-unit").forEach(function(node) {
                        domClass.remove(node, "active");
                    });
                };
            },
            roll:function(){
                var index = this.index;
                var count = this.count;
                var lottery = this.obj;
                query("#lottery-unit-"+index).forEach(function(node) {
                    domClass.remove(node, "active");
                });
                index += 1;
                if (index>count-1) {
                    index = 0;
                };
                query("#lottery-unit-"+index).forEach(function(node) {
                    domClass.add(node, "active");
                });
                this.index=index;
                return false;
            },
            stop:function(index){
                this.prize=index;
                return false;
            }
        };
        function roll(){
            lottery.times += 1;
            lottery.roll();
            if (lottery.times > lottery.cycle+10 && lottery.prize == lottery.index) {
                clearTimeout(lottery.timer);
                if (popup.offsetHeight === 0) {
                    // 不可见，调用Slider.slideDown函数：在300毫秒内下拉
                    Slider.slideDown(popup, 300);
                };
                lottery.prize=-1;
                lottery.times=0;
                click=false;       //  如果已经点击则点击失效，运动停止后可以再次点击
            }else{
                if (lottery.times<lottery.cycle) {



                    lottery.speed -= 10;
                }else if(lottery.times==lottery.cycle) {
                    var index = Math.random()*(lottery.count)|0;
                    lottery.prize = index;   // 设置奖品中奖位置
                }else{
                    if (lottery.times > lottery.cycle+10 && ((lottery.prize==0 && lottery.index==7) || lottery.prize==lottery.index+1)) {
                        lottery.speed += 110;
                    }else{
                        lottery.speed += 20;
                    }
                }
                if (lottery.speed < 40) {
                    lottery.speed=40;
                };
                lottery.timer = setTimeout(roll,lottery.speed);
            }
            return false;
        }
    });/**
 * Created by lyc on 2016/6/20.
 */
