/* 
* @Author: Marte
* @Date:   2017-11-09 20:45:05
* @Last Modified by:   Marte
* @Last Modified time: 2017-11-10 11:55:50
*/

var gulp = require('gulp');
var sass = require('gulp-sass');
gulp.task('compileSass',function(){
    gulp.src('./src/sass/*.scss')
        .pipe(sass({outputStyle:'expanded'}).on('error',sass.logError))
        .pipe(gulp.dest('./src/css/'))
})

gulp.task('jtSass',function(){
    gulp.watch('./src/sass/*.scss',['compileSass']);
})
