var gulp = require('gulp');
var del = require('del');
var pump = require('pump');
var minify = require('gulp-clean-css');
var header = require('gulp-header');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');


var pkg = require('./bower.json');
var banner = ['/** <%= pkg.name %> - v<%= pkg.version %> */', ''].join('\n');

gulp.task('clean', function(cb) {
    return del(['minified'], cb);
});

gulp.task('css', ['clean'], function(cb) {
    pump([
        gulp.src('unminified/ng-croppie.css'),
        rename({suffix: '.min'}),
        minify({compatibility: 'ie11', keepBreaks: true}),
        //header(banner, {pkg: pkg}),
        gulp.dest('minified')
    ], cb);
});

gulp.task('js', ['clean'], function(cb) {
    pump([
        gulp.src('unminified/ng-croppie.js'),
        rename({suffix: '.min'}),
        uglify(),
        //header(banner, {pkg: pkg}),
        gulp.dest('minified')
    ], cb);
});

gulp.task('default', ['css', 'js']);
