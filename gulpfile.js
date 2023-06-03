const gulp = require('gulp')
const clean = require('gulp-clean')
const shell = require('gulp-shell')

gulp.task('clean', function () {
  return gulp.src('dist', { read: false }).pipe(clean())
})

gulp.task('install', shell.task('npm install'))

gulp.task('default', gulp.series('install'))
