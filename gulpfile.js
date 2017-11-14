/* 
* @Author: Marte
* @Date:   2017-11-09 20:45:05
* @Last Modified by:   Marte
* @Last Modified time: 2017-11-11 18:13:36
*/

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var path = {
    sass:'./src/sass/*.scss',
    css:'./src/css/',
    dist:'./src/dist/'
}
gulp.task('compileSass',function(){
    gulp.src(path.sass)
        .pipe(sass({outputStyle:'expanded'}).on('error',sass.logError))
        .pipe(gulp.dest(path.css))
})
var opt = {
    newLine:';'
}
gulp.task('mergeJs',function(){
    gulp.src(['./src/js/_conmonHtml.js','src/js/index.js'])
        .pipe(concat('index.js'))
        .pipe(gulp.dest(path.dist))
})
gulp.task('jtSass',function(){
    gulp.watch('./src/sass/*.scss',['compileSass']);
})
