/*
require(["dojo/dom", "dojo/on", "dojo/request/script",
    "dojo/json", "dojo/domReady!"
], function(dom, on, script, JSON){

    var resultDiv = dom.byId("resultDiv");


    on(dom.byId('box'),"click", function(evt){

        var d = new Date(),
            dateNow = d.toString();
        script.get("http://localhost:8080/online/services/ol037?channel=f64b10f722&&param={%22ltrId%22:%222%22,%22mblNum%22:%2218612720004%22}",{
            jsonp: "callback",
            query: {
                clienttime: dateNow
            }
        }).then(function(data){
            json = eval('('+data.json+')');
            var prizeTime = json.luckyNumbers.addDtTm;
            var prizeNa = json.luckyNumbers.przNm;
            if(prizeNa.indexOf('萝卜') >=0) {
                prizeNum = 1;
            }else if(prizeNa.indexOf('50M') >=0){
                prizeNum = 2;
            } else if(prizeNa.indexOf('100M') >=0){
                prizeNum = 3;
            }  else if(prizeNa.indexOf('150M') >=0){
                prizeNum = 4;
            } else if(prizeNa.indexOf('200M') >=0){
                prizeNum = 5;
            } else if(prizeNa.indexOf('250M') >=0){
                prizeNum = 6;
            }
            var newItem=document.createElement("li");
            if (json.msg.errMsg[0].msgID == MOL03701E){
                var textnode=document.createTextNode('不好意思您还没有中奖！');
            } else if (json.msg.promptMsg[0].msgID == MOL03701I){
                var textnode=document.createTextNode(prizeTime.slice(4,6)+'月'+prizeTime.slice(6,8)+'日'+json.luckyNumbers.mblNum+' 抽中: ');
            }

            newItem.appendChild(textnode);
            var list=document.getElementById("resultDiv");
            list.insertBefore(newItem,list.childNodes[0]);
        },function(error){
            resultDiv.innerHTML = error;
        });
    });
});*/


//            function callBack(){
//                setTimeout(function(){
//                    domClass.add(dom.byId('popup'), 'act');
//                    var txt = turnplate.restaraunts[prizeNum-1];
//
//                    dom.byId('prizeT').innerHTML = txt;
//                    // 创建节点   插入到 scrollUl 中;
//                    var d = new Date(),
//                    dateNow = d.toString();
//	                script.get("http://localhost:8080/online/services/ol037?channel=f64b10f722&&param={%22ltrId%22:%222%22,%22mblNum%22:%2218612720004%22}",{
//	                    jsonp: "callback",
//	                    query: {
//	                        clienttime: dateNow
//	                    }
//	                }).then(function(data){
//
//	                    json = eval('('+data.json+')');
//	                    msg = eval('('+data.msg+')');
//	                    json = eval('('+data.json+')');
//	                    var prizeNa = json.luckyNumbers.przNm;
//	                    console.log(prizeNa);
//	                    if(prizeNa.indexOf('萝卜') >=0) {
//	                        prizeNum = 1;
//	                        query('.smile').attr('src', 'images/cry.png');
//	                    } else if(prizeNa.indexOf('50M') >=0){
//	                        prizeNum = 2;
//	                    } else if(prizeNa.indexOf('100M') >=0){
//	                        prizeNum = 3;
//	                    }  else if(prizeNa.indexOf('150M') >=0){
//	                    	prizeNum = 4;
//	                    } else if(prizeNa.indexOf('200M') >=0){
//	                        prizeNum = 5;
//	                    } else if(prizeNa.indexOf('250M') >=0){
//	                        prizeNum = 6;
//	                    }
//	                    var prizeTime = json.luckyNumbers.addDtTm;
//	                    var newItem = document.createElement("li");
//	                    if (json.msg.errMsg[0].msgID == 'MOL03701E'){
//	                    	prizeNum = 1;
//	                        query('.smile').attr('src', 'images/cry.png');
//	                        var textnode = document.createTextNode('不好意思您还没有中奖！');
//	                    } else if (json.msg.promptMsg[0].msgID == 'MOL03701I'){
//	                        var textnode=document.createTextNode(prizeTime.slice(4,6)+'月'+prizeTime.slice(6,8)+'日'+json.luckyNumbers.mblNum+' 抽中: ');
//	                    }
//	                    newItem.appendChild(textnode);
//	                    var list=document.getElementById("scrollUl");
//	                    list.insertBefore(newItem,list.childNodes[0]);
//	                },function(error){
//	                    resultDiv.innerHTML = error;
//	                });
//                    // 收起遮罩层
//                    query('.btn').on('click', function(){
//                        coreFx.wipeOut({
//                            node: "popup",
//                            duration: 300
//                        }).play();
//                    });
//                },5200);
//
//
//            }
//            switch (prizeNum) {
//            case 1:
//                domClass.add(dom.byId('wheelcanvas'), 'run1');
//                domClass.add(dom.byId('wrap'), 'run1');
//                callBack();
//                break;
//            case 2:
//                domClass.add(dom.byId('wheelcanvas'), 'run2');
//                domClass.add(dom.byId('wrap'), 'run2');
//                callBack();
//                break;
//            case 3:
//                domClass.add(dom.byId('wheelcanvas'), 'run3');
//                domClass.add(dom.byId('wrap'), 'run3');
//                callBack();
//                break;
//            case 4:
//                domClass.add(dom.byId('wheelcanvas'), 'run4');
//                domClass.add(dom.byId('wrap'), 'run4');
//                callBack();
//                break;
//            case 5:
//                domClass.add(dom.byId('wheelcanvas'), 'run5');
//                domClass.add(dom.byId('wrap'), 'run5');
//                callBack();
//                break;
//            case 6:
//                domClass.add(dom.byId('wheelcanvas'), 'run6');
//                domClass.add(dom.byId('wrap'), 'run6');
//                callBack();
//                break;
//        }
