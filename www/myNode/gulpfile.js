/* gulp.task(‘任务名’, function(){
 *  //这里执行一些事
 *  });
 **/
var gp = require("gulp");
gp.task("xiaozu", function(){
    gp.src(['*.js','!gulpfile.js']).pipe(gp.dest('./build/js'));
    gp.src(['*.css']).pipe(gp.dest('./build/css'));
});