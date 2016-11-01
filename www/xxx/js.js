$(function(){
   var data = {"json":"{\"luckyNumbers\":[{\"actDtTm\":\"20160614152454\",\"addDtTm\":\"20160615111601\",\"ltrID\":0,\"mblNum\":\"18000000002\",\"przNm\":\"33333\"},{\"actDtTm\":\"20160615111601\",\"addDtTm\":\"20160615111601\",\"ltrID\":0,\"mblNum\":\"18000000002\",\"przNm\":\"33333\"}],\"msg\":{\"errMsg\":[],\"promptMsg\":[{\"msgID\":\"MOL03701I\",\"msgTxt\":\"中奖号码查询成功。\"}],\"warnMsg\":[]}}"};

    var data = eval('('+data.json+')');
    console.log(data.luckyNumbers[0].przNm);
    $('button').click(function(){
        var value = $('input').attr('value');
        if(value == data.luckyNumbers[0].mblNum) {
            console.log('奖品是：' + data.luckyNumbers[0].przNm);
            $('h1').html('奖品是：' + data.luckyNumbers[0].przNm);
        } else {
            console.log('xxxxxx');
        }
        var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        if(!myreg.test($("input").val()))
        {
            alert('请输入有效的手机号码！');
            return false;
        }
    });







});