module.exports=
{
    entry:[                     //entry是入口文件，可以多个，代表要编译哪些JS
        './xiaozu.js'
    ],
    output:{
        path:'./build/js',      //输出文件夹
        filename: 'build.js'    //最终打包生成的文件名
    }

};




