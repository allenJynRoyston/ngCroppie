var gulp = require('gulp');
var concat = require('gulp-concat');
var pump = require('pump');
var mainBowerFiles = require('gulp-main-bower-files');
var minify = require('gulp-clean-css');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');


gulp.task('css', function(cb) {
    pump([
        gulp.src('./bower.json'),
        mainBowerFiles('**/*.css'),
        concat('ng-croppie.css'),
        gulp.dest('./')
    ], cb);
});

gulp.task('css-minify', function(cb) {
    pump([
        gulp.src('./bower.json'),
        mainBowerFiles('**/*.css'),
        concat('ng-croppie.css'),
        rename({suffix: '.min'}),
        minify({compatibility: 'ie11', keepBreaks: true}),
        gulp.dest('./')
    ], cb);
});

gulp.task('js', function(cb) {
    pump([
        gulp.src('ng-croppie.js'),
        rename({suffix: '.min'}),
        uglify(),
        gulp.dest('./')
    ], cb);
});

gulp.task('default', ['css', 'css-minify', 'js']);