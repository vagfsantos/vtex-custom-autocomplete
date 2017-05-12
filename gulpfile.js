var gulp = require('gulp');

//webpack
var webpack = require('webpack');
var gulpWebpack = require('webpack-stream');
var webpackConfig = require('./webpack.config.js');


var clean = require('gulp-clean');
var watch = require('gulp-watch');
var gulpDocumentation = require('gulp-documentation');

// ************************
// DEVELOPMENT TASKS
// ************************
gulp.task('clean-dev', function(){
    return gulp.src('./build')
        .pipe(clean());
});

gulp.task('webpack-dev', function() {
    return gulp.src('src/js/index.js')
        .pipe(gulpWebpack(webpackConfig, webpack))
        .pipe(gulp.dest('build/'));
});

gulp.task('build', ['clean-dev', 'doc', 'webpack-dev'], function() {
    return gulp.src('src/js/index.js')
        .pipe(gulpWebpack(webpackConfig, webpack))
        .pipe(gulp.dest('build/'));
});


// ************************
// REALEASE TASKS
// ************************
gulp.task('clean-dist', function(){
    return gulp.src('./dist')
        .pipe(clean());
});

gulp.task('webpack-dist', function() {
    return gulp.src('src/js/index.js')
        .pipe(gulpWebpack(webpackConfig, webpack))
        .pipe(gulp.dest('dist/'));
});

gulp.task('dist', ['clean-dist', 'webpack-dist', 'doc'], function() {
    return gulp.src('src/js/index.js')
        .pipe(gulpWebpack(webpackConfig, webpack))
        .pipe(gulp.dest('dist/'));
});

gulp.task('doc', function () {
    gulp.src('./src/**/*.js')
        .pipe(gulpDocumentation('md', {filename: 'README.md'}))
        .pipe(gulp.dest('./'));
});


// ************************
// DEFAULT
// ************************
gulp.task('default', ['build'], function(){
    gulp.watch('src/js/**/*.js', ['webpack-dev'])
        .on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});