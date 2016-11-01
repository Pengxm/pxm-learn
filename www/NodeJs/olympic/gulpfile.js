var gulp = require('gulp');
var less = require('gulp-less');
var jade = require('gulp-jade');
var connect = require('gulp-connect');

gulp.task('less', function(){
    gulp.src('gulp/*.scss')
    .pipe(less())
    .pipe(gulp.dest('wap/css'))
});

gulp.task('jade', function(){
    gulp.src('gulp/*.jade')
    .pipe(jade({
        pretty:true
    }))
    .pipe(gulp.dest('wap'))
});


gulp.task('watch', function(){
    gulp.watch('gulp/*.scss', ['less']);
    gulp.watch('gulp/*.jade', ['jade']);
});

gulp.task('connect', function() {
    connect.server({
        root: 'wap',
        livereload: true,
        port: 3000,
        host: '127.0.0.1'
    })
});

gulp.task('default' ,function(){
    gulp.start(['less','jade','watch','connect']);
});









