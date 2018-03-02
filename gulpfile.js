'use strict';

var gulp = require('gulp'),
    less = require('gulp-less'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    cssmin = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    watch = require('gulp-watch'),
    rimraf = require('rimraf'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;


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
    },
    watch: {
        html: 'src/**/*.html',
        img: 'src/img/**/*.*',
        js: 'src/js/**/*.js',
        less: 'src/style/**/*.less'
    },
    clean: 'build'

};

var config = {
    server: {
        baseDir: "./build"
    }
};

//Task for html
gulp.task('html', function () {
    gulp.src(path.src.html)
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});


//Task for less
gulp.task('less', function () {
    gulp.src(path.src.less)
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(rename({suffix: ".min"}))
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));

});

//Task for images
gulp.task('images', function () {
    gulp.src(path.src.img)
        .pipe(imagemin({ //Сожмем их
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({stream: true}));
});

//All builds
gulp.task('build', [
    'html',
    'less',
    'images'
]);

//Watch task
gulp.task('watch', function () {
    watch([path.watch.html], function(event, cb) {
        gulp.start('html');
    });
    watch([path.watch.less], function(event, cb) {
        gulp.start('less');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('images');
    });
});

//Browser sync
gulp.task('server', function () {
    browserSync(config);
});


//Clear
gulp.task('clean', function (cb) {
    rimraf('./build', cb);
});



gulp.task('default', ['build', 'watch', 'server'], function () {
    console.log('ok');
});