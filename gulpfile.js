'use strict';

var gulp = require('gulp');
var less = require('gulp-less');

var path = {
    build: {
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/'
    },
    src: {
        html: 'src/*.html',
        img: 'src/img/**/*.*',
        js: 'src/js/main.js',
        less: 'src/style/style.less'
    }

};

var config = {
    server: {
        baseDir: "./build"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "Frontend_Devil"
};

//Task for html



//Task for less
gulp.task('less', function () {
    gulp.src(path.src.less)
        .pipe(less())
        .pipe(gulp.dest(path.build.css));
});



gulp.task('default', ['less'], function () {
    console.log('ok');
});