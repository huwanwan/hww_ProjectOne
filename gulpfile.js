/* 
* @Author: Marte
* @Date:   2017-11-09 20:45:05
* @Last Modified by:   Marte
* @Last Modified time: 2017-11-15 13:43:28
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
gulp.task('jtSass',function(){
    gulp.watch('./src/sass/*.scss',['compileSass']);
})
