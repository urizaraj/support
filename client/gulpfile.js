const autoprefixer = require('autoprefixer')
const gulp = require('gulp')
const postcss = require('gulp-postcss')
const sass = require('gulp-sass')

const source = './src/*.scss'

gulp.task('sass', () => {
  const destination = './src'
  return gulp
    .src(source)
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest(destination))
})

gulp.task('sass:watch', () => gulp.watch(source, ['sass']))

gulp.task('default', ['sass:watch'])
