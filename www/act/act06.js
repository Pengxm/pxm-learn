
require(["dojo/dom","dojo/on","dojo/dom-style","dojo/query","dojo/dom-class","dojo/fx","dojo/dom-attr","dojo/_base/fx","dojo/request/script","dojo/json", "dojo/ready"],
    function(dom, on, domStyle, query, domClass, coreFx, domAttr, fx, script, JSON, ready){
    window.onload = function(){
        //设置遮罩层的高度
        var popupH = document.documentElement.clientHeight;
        document.getElementById('popup').style.height = popupH+'px';
        drawRouletteWheel();
    };
    ready(function(){
        function index(current, obj){
            for (var i = 0, length = obj.length; i<length; i++) {
                if (obj[i] == current) {
                    return i;
                }
            }
        }
        query('#ulTab li').on('click', function () {
            var li = query('#ulTab li');
            console.log(index(this, li));
        });
        drawRouletteWheel();
        var c = 1;
        on(dom.byId('pointer'), 'click', function(){
            if(c>1){ alert('您今天已抽过奖'); return false; };
            c++;

            var data = 2;
            function callBack(evt){
                setTimeout(function(){
                    if(data==3){
                        query('.smile').attr('src', 'images/cry.png');
                    }
                    domClass.add(dom.byId('popup'), 'act');
                    var txt = turnplate.restaraunts[data-1];
                    dom.byId('prizeT').innerHTML = txt;
                    // 创建节点   插入到 scrollUl 中;
                    var myData = {"json":"{\"luckyNumbers\":[{\"actDtTm\":\"20160512172111\",\"addDtTm\":\"20160530172111\",\"ltrID\":0,\"mblNum\":\"18612720004\",\"przNm\":\"150M流量\"},{\"actDtTm\":\"20160530172111\",\"addDtTm\":\"20160530172111\",\"ltrID\":0,\"mblNum\":\"18612720004\",\"przNm\":\"150M流量\"},{\"actDtTm\":\"20160519172111\",\"addDtTm\":\"20160530172111\",\"ltrID\":0,\"mblNum\":\"18612720004\",\"przNm\":\"150M流量\"},{\"actDtTm\":\"20160516172111\",\"addDtTm\":\"20160530172111\",\"ltrID\":0,\"mblNum\":\"18612720004\",\"przNm\":\"150M流量\"},{\"actDtTm\":\"20160515172111\",\"addDtTm\":\"20160530172111\",\"ltrID\":0,\"mblNum\":\"18612720004\",\"przNm\":\"150M流量\"},{\"actDtTm\":\"20160514172111\",\"addDtTm\":\"20160530172111\",\"ltrID\":0,\"mblNum\":\"18612720004\",\"przNm\":\"150M流量\"},{\"actDtTm\":\"20160513172111\",\"addDtTm\":\"20160530172111\",\"ltrID\":0,\"mblNum\":\"18612720004\",\"przNm\":\"150M流量\"}],\"msg\":{\"errMsg\":[],\"promptMsg\":[{\"msgID\":\"MOL03701I\",\"msgTxt\":\"中奖号码查询成功。\"}],\"warnMsg\":[]}}"};
                    json = eval('('+myData.json+')');
                    console.log(json.luckyNumbers[0].actDtTm);

                    // console.log(json.luckyNumbers[0].actDtTm);
                    var html = '';
                    for(var i =0, length = json.luckyNumbers.length; i<length; i++){
                        var actTimeMonth = json.luckyNumbers[i].actDtTm.slice(4,6);
                        var actTimeDay = json.luckyNumbers[i].actDtTm.slice(6,8);
                        var prizeTime = json.luckyNumbers[i].actDtTm.slice(4,6);
                        html += '<li class="myLi">'+actTimeMonth+'月'+actTimeDay+'日'+json.luckyNumbers[i].mblNum+' 谢谢参与'+'</li>';
                        if(json.luckyNumbers[i].actDtTm == json.luckyNumbers[i].addDtTm){
                            var index = i;
                        }
                    };
                    dom.byId('scrollUl').innerHTML = html;
                    query('#scrollUl .myLi')[index].innerHTML = actTimeMonth+'月'+actTimeDay+'日'+json.luckyNumbers[0].mblNum+' '+txt;
                    // var newItem=document.createElement("li");
                    // var textnode=document.createTextNode('6月1日 '+json.luckyNumbers[0].mblNum+' 抽中: '+txt);
                    // newItem.appendChild(textnode);
                    // var list=document.getElementById("scrollUl");
                    // list.insertBefore(newItem,list.childNodes[0]);

                    query('.btn').on('click', function(){
                        coreFx.wipeOut({
                            node: "popup",
                            duration: 300
                        }).play();
                    });
                },5200);
            }

            switch (2) {
                case 1:
                    domClass.add(dom.byId('wheelcanvas'), 'run1');
                    callBack();
                    break;
                case 2:
                    domClass.add(dom.byId('wheelcanvas'), 'run2');
                    domClass.add(dom.byId('plate'), 'run2');
                    callBack();
                    break;
                case 3:
                    domClass.add(dom.byId('wheelcanvas'), 'run3');
                    callBack();
                    break;
                case 4:
                    domClass.add(dom.byId('wheelcanvas'), 'run4');
                    callBack();
                    break;
                case 5:
                    domClass.add(dom.byId('wheelcanvas'), 'run5');
                    callBack();
                    break;
                case 6:
                    domClass.add(dom.byId('wheelcanvas'), 'run6');
                    callBack();
                    break;
            }
        });

        query('.rule').on('click', function(){
            domClass.remove(dom.byId('record'), 'act');
            domClass.add(dom.byId('rule'), 'act');
        });
        var n = 10;
        var timer = null;
        query('.record').on('click', function(){
            domClass.remove(dom.byId('rule'), 'act');
            domClass.add(dom.byId('record'), 'act');
            clearInterval(timer);
            var h = dom.byId('scrollUl').clientHeight;
            timer = setInterval(function(){
                n+=2;
                if(n>(h-90)){n=10}
                domStyle.set('scrollUl', 'top', -n+'px');
            },100);
        });
    });
function drawRouletteWheel() {
    var canvas = document.getElementById("wheelcanvas");
    if (canvas.getContext) {
        //根据奖品个数计算圆周角度
        var arc = Math.PI / (turnplate.restaraunts.length / 2);
        var ctx = canvas.getContext("2d");
        //在给定矩形内清空一个矩形
        ctx.clearRect(0, 0, 422, 422);
        //strokeStyle 属性设置或返回用于笔触的颜色、渐变或模式
        ctx.strokeStyle = "rgba(0,0,0,0)";   //#FFBE04
        //font 属性设置或返回画布上文本内容的当前字体属性
        ctx.font = '16px Microsoft YaHei';
        for (var i = 0; i < turnplate.restaraunts.length; i++) {
            var angle = turnplate.startAngle + i * arc;
            ctx.fillStyle = turnplate.colors[i];
            ctx.beginPath();
            //arc(x,y,r,起始角,结束角,绘制方向) 方法创建弧/曲线（用于创建圆或部分圆）
            ctx.arc(211, 211, turnplate.outsideRadius, angle, angle + arc, false);
            ctx.arc(211, 211, turnplate.insideRadius, angle + arc, angle, true);
            ctx.stroke();
            ctx.fill();
            //锁画布(为了保存之前的画布状态)
            ctx.save();

            //----绘制奖品开始----
            ctx.fillStyle = "#fff"; //设置奖品字体颜色#E5302F
            var text = turnplate.restaraunts[i];
            var line_height = 17;
            //translate方法重新映射画布上的 (0,0) 位置
            ctx.translate(211 + Math.cos(angle + arc / 2) * turnplate.textRadius, 211 + Math.sin(angle + arc / 2) * turnplate.textRadius);

            //rotate方法旋转当前的绘图
            ctx.rotate(angle + arc / 2 + Math.PI / 2);

            /* 下面代码根据奖品类型、奖品名称长度渲染不同效果，如字体、颜色、图片效果。(具体根据实际情况改变) */
            if (text.indexOf("M") > 0) {//流量包
                var texts = text.split("M");
                for (var j = 0; j < texts.length; j++) {   // 设置奖品两行字体大小
                    ctx.font = j == 0 ? 'bold 22px Microsoft YaHei' : '18px Microsoft YaHei';
                    if (j == 0) {
                        ctx.fillText(texts[j] + "M", -ctx.measureText(texts[j] + "M").width / 2, j * line_height);
                    } else {
                        ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * line_height);
                    }
                }
            } else if (text.indexOf("元") > 0) {//流量包
                var texts = text.split("元");
                for (var j = 0; j < texts.length; j++) {   // 设置奖品两行字体大小
                    ctx.font = j == 0 ? 'bold 22px Microsoft YaHei' : '18px Microsoft YaHei';
                    if (j == 0) {
                        ctx.fillText(texts[j] + "元", -ctx.measureText(texts[j] + "元").width / 2, j * line_height);
                    } else {
                        ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * line_height);
                    }
                }
            } else if (text.indexOf("M") == -1 && text.length > 6) {//奖品名称长度超过一定范围
                text = text.substring(0, 6) + "||" + text.substring(6);
                var texts = text.split("||");
                for (var j = 0; j < texts.length; j++) {
                    ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * line_height);
                }
            } else {
                //在画布上绘制填色的文本。文本的默认颜色是黑色
                //measureText()方法返回包含一个对象，该对象包含以像素计的指定字体宽度
                ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
            }



            // if (text.indexOf("元") > 0) {//流量包
            //     var texts2 = text.split("元");
            //     for (var nn = 0; nn < texts2.length; nn++) {   // 设置奖品两行字体大小
            //         ctx.font = nn == 0 ? 'bold 22px Microsoft YaHei' : '18px Microsoft YaHei';
            //         if (nn == 0) {
            //             ctx.fillText(texts2[nn] + "元", -ctx.measureText(texts2[nn] + "元").width / 2, nn * line_height);
            //         } else {
            //             ctx.fillText(texts2[nn], -ctx.measureText(texts2[nn]).width / 2, nn * line_height);
            //         }
            //     }
            // } else if (text.indexOf("元") == -1 && text.length > 6) {//奖品名称长度超过一定范围
            //     text = text.substring(0, 6) + "||" + text.substring(6);
            //     var texts2 = text.split("||");
            //     for (var nn = 0; nn < texts.length; nn++) {
            //         ctx.fillText(texts[nn], -ctx.measureText(texts[nn]).width / 2, nn * line_height);
            //     }
            // } else {
            //     //在画布上绘制填色的文本。文本的默认颜色是黑色
            //     //measureText()方法返回包含一个对象，该对象包含以像素计的指定字体宽度
            //     ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
            // }














            //添加对应图标
            if (text.indexOf("邮币") > 0) {
                var img = document.getElementById("shan-images");
                img.onload = function () {
                    ctx.drawImage(img, -15, 10);
                };
                ctx.drawImage(img, -15, 10);
            } else if (text.indexOf("谢谢参与") >= 0) {
                var img = document.getElementById("sorry-images");
                img.onload = function () {
                    ctx.drawImage(img, -15, 10);
                };
                ctx.drawImage(img, -15, 10);
            }
            //把当前画布返回（调整）到上一个save()状态之前
            ctx.restore();
            //----绘制奖品结束----
        }
    }   //["#FFF4D6", "#FFFFFF", "#FFF4D6", "#FFFFFF", "#FFF4D6", "#FFFFFF"]
}
        var turnplate = {         //大转盘奖品名称
            restaraunts: ["50M免费流量包", "10元免费流量包", "谢谢参与", "100M免费流量包", "150M免费流量包", "20M免费流量包"],
            colors: ["rgba(0,0,0,0)", "rgba(0,0,0,0)", "rgba(0,0,0,0)", "rgba(0,0,0,0)", "rgba(0,0,0,0)", "rgba(0,0,0,0)"],	 //颜色				//大转盘奖品区块对应背景颜色
            outsideRadius: 168,			//大转盘外圆的半径
            textRadius: 135,				//大转盘奖品位置距离圆心的距离
            insideRadius: 0,			//大转盘内圆的半径
            startAngle: 0,				//开始角度
            bRotate: false				//false:停止;ture:旋转
        };

            /*outsideRadius: 192,			//大转盘外圆的半径
            textRadius: 155,				//大转盘奖品位置距离圆心的距离
            insideRadius: 68,*/
});
// 获取中奖记录
//          function myJSON(){
//        	var d = new Date(),
//            dateNow = d.toString();
//            script.get('http://localhost:8080/online/services/ol037?channel=f64b10f722&&param={"ltrId":'+ltrID+',"mblNum":'+telNum+'}',{
//                jsonp: "callback",
//                query: {
//                    clienttime: dateNow
//                }
//            }).then(function(data){
//                json = eval('('+data.json+')');
//                var txt = json.luckyNumbers[0].przNm;
//                tel = tel.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
//                var html = '';
//                for(var i =0, length = json.luckyNumbers.length; i<length; i++){
//                    var actTimeMonth = json.luckyNumbers[i].actDtTm.slice(4,6);
//                    var actTimeDay = json.luckyNumbers[i].actDtTm.slice(6,8);
//                    html += '<li class="myLi">'+actTimeMonth+'月'+actTimeDay+'日  '+tel+' 谢谢参与'+'</li>';
//                    if(json.luckyNumbers[i].actDtTm == json.luckyNumbers[i].addDtTm){
//                        var index = i;
//                    }
//                };
//                dom.byId('scrollUl').innerHTML = html;
//                query('#scrollUl .myLi')[index].innerHTML = actTimeMonth+'月'+actTimeDay+'日  '+tel+' '+prizeNa;
//
//            },function(error){
//                alert(error);
//            });
//        }
