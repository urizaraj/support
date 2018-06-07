var autoprefixer = require('autoprefixer');
var gulp = require('gulp');
var postcss = require('gulp-postcss');
var sass = require('gulp-sass');

gulp.task('sass', function () {
    var source = './src/*.scss'
    var destination = './src';
    return gulp.src(source)
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([autoprefixer()]))
        .pipe(gulp.dest(destination))
})

gulp.task('sass:watch', function () {
    var source = './src/*.scss'
    var watcher = gulp.watch(source, ['sass']);
});

gulp.task('default', ['sass:watch']);