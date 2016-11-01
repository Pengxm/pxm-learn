
(function(){
    //得到容器、canvas元素、上下文
    var banner_container = document.getElementById("banner_container");
    var canvas = document.getElementById("banner_canvas");
    var ctx = banner_canvas.getContext("2d");

    //容器和canvas的宽度、高度
    var w,h;
    //设置容器宽度、高度，这个函数被onresize事件调用
    function setCanvas(){
        //宽度
        w = parseInt(getComputedStyle(banner_container)["width"]);
        //高度，按比例计算
        h = w * (460 / 1120);
        //设置
        canvas.width = w ;
        canvas.height = h;
    }
    //设置宽度、高度
    setCanvas();
    //窗口改变尺寸的时候，重新设置canvas画布的宽度、高度。
    window.onresize = function(){
        setCanvas();
    };
    //鼠标移动的时候，产生一个角度
    $(banner_container).mousemove(function(event){
        var x = event.offsetX;
        var y = event.offsetY;
        //去掉过渡
        canvas.style.transition = "none";
        canvas.style.webkitTransform = "rotateY(" + (x - w / 2) / 460 + "deg) rotateX(" + -(y - h / 2) / 220 + "deg)";
        $(this).addClass("in");
    });

    $(banner_container).mouseleave(function(event){
        $(this).removeClass("in");
        canvas.style.transition = "all 0.3s ease 0s";
        canvas.style.webkitTransform = "none";

    });


    //读取资源
    var R = {
        "banner" : "images/banner1.jpg",
        "s" : "images/s.png"
    };
    var Robj = {};

    var already = 0;
    //读取图片
    for(var k in R){
        Robj[k] = new Image();
        Robj[k].src = R[k];
        Robj[k].onload = function(){
            already ++;
            if(already == 2){
                start();
            }
        }
    }


    function start(){
        //帧编号
        var frameNumber = 0;

        //扇叶
        var s1 = new Shanye(806,227,0.04);
        var s2 = new Shanye(882,227,0.05);

        //主定时器
        setInterval(function(){
            //帧编号加1
            frameNumber ++;
            //清屏
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(Robj.banner, 0,0, canvas.width, canvas.height);

            //渲染扇叶
            s1.render();
            s2.render();

            //更新、渲染所有小球
            _.each(ballArr , function(ball){
                ball.update();
                ball.render();
            });
        },10);
    }

    //扇叶类
    function Shanye(x,y,speed){
        this.image = Robj.s;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.angle = 0;
    }
    Shanye.prototype.render = function(){
        this.angle += this.speed;
        ctx.save();
        ctx.translate(this.x + 53.5, this.y + 61);
        ctx.rotate(this.angle);
        ctx.drawImage(this.image,-53.5,-61);
        ctx.restore();
    };


    //圆形类
    function Ball(x,y){
        //自己的参数，都是随机的
        this.x = x;
        this.y = y;
        this.r = _.random(2,30);
        this.color = _.sample(["#66CCCC","#CCFF66","#FF99CC","#99CC33","#FFCC00","#66CCCC"]);

        // 自己的x增量和y增量
        this.dx = _.random(-4,4);
        this.dy = _.random(-4,4);

        this.f = 0;

        //把自己放入数组
        ballArr.push(this);
    }
    //更新方法
    Ball.prototype.update = function(){
        this.f++;

        this.dx += _.random(-2,2);
        this.dy += _.random(-2,2);
        //这个方法，每帧执行。
        this.x += this.dx;
        this.y += this.dy;
        this.r -= 0.4;

        //如果半径小于了0，从数组中删除自己
        if(this.r < 0){
            ballArr = _.without(ballArr,this);
        }
    };
    //渲染方法
    Ball.prototype.render = function(){
        if(this.r < 0){
            return;
        }
        //绘制
        ctx.globalAlpha = 0.7;
        ctx.beginPath();
        ctx.arc(this.x , this.y , this.r , 0 , Math.PI * 2 , false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.globalAlpha = 1;
    };

    //放小球的数组
    var ballArr = [];

    //鼠标监听。鼠标移动帮我们创建小球，定时器帮我们进行小球的动画和渲染。
    canvas.addEventListener("mousemove", function(event){
        new Ball(event.offsetX , event.offsetY);
    }, false);
})();