//我们在xiaozu.js中新增红色代码部分
var getlib = require('slib');
//把生成的内容读取出来，生成一个新的文件。
var file = require('fs');
file.writeFile("build.js","");

function genCode(key,value){
    return 'var '+key+'='+value+';\n';
}
file.readFile("./test.css",function(err,data){
    if(err){
        //代表出错，简单起见，这课俺们啥都不写
    }else{
        /*利用NODEJS读取出css 后，用正则读取图片路径
         为了演示方便，我们就读取后缀为jpg的内容。*/

        var pattern=/['|"](.*\.jpg)['|"]/g;
        var res;
        while(res=pattern.exec(data.toString()))
            //这段并不完善的正则就可以匹配出一般格式的图片内容(jpg).且返回的是一个数组
        {
            var getImg = file.readFileSync(res[1]); //获取图片的路径和值
            //奇幻图片成base64格式
            data = data.toString().replace(res[1],"data:image/jpg;base64,"+getImg.toString("base64").trim());
            file.appendFile("build.js","document.write('<style>"+data+"</style>')");
        }

    }
});
for(var xxoo in getlib){
    file.appendFile("build.js",genCode(xxoo,getlib[xxoo]));
    //console.log(getlib[xxoo]);
}
file.appendFile("build.js","showName();\n");