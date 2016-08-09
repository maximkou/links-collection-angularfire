/**
 * Created by maximkou on 09.08.16.
 */
var gulp = require('gulp'),
    requirejsOptimize = require('gulp-requirejs-optimize'),
    del = require('del'),
    htmlReplace = require('gulp-html-replace'),
    cssNano = require('gulp-cssnano'),
    Promise = require('es6-promise').Promise,
    concat = require('gulp-concat'),
    buildDir = 'build/public';

gulp.task('clean-build', function () {
    del([buildDir]);
});

gulp.task('move-index', ['clean-build'], function () {
    return gulp.src('index.html')
        .pipe(htmlReplace({
            js: 'app.js',
            css: 'css/style.min.css'
        }))
        .pipe(gulp.dest(buildDir));
});

gulp.task('move-src', ['move-index'], function() {
    return gulp
        .src([
            'src/*/*/*.html',
            'src/translations.json'
        ])
        .pipe(gulp.dest(buildDir + '/src'));
});

gulp.task('optimize-js', ['move-src'], function () {
    return gulp
        .src('src/app.js')
        .pipe(requirejsOptimize({
            baseUrl: './src',
            name: 'app',
            mainConfigFile: './src/app.js',
            include: ['requireLib'],
            paths: {
                'requireLib': '../bower_components/requirejs/require'
            },

            wrap: true
        }))
        .pipe(gulp.dest(buildDir))
});

gulp.task('optimize-css', ['move-src'], function () {
    return gulp.src([
            'css/style.css',
            'bower_components/bootstrap/dist/css/bootstrap.min.css',
            'bower_components/bootstrap/dist/css/bootstrap-theme.min.css',
            'bower_components/ng-tags-input/ng-tags-input.min.css'
        ])
        .pipe(concat('style.min.css'))
        .pipe(cssNano())
        .pipe(gulp.dest(buildDir + '/css'));
});

gulp.task('move-fonts', ['move-src'], function () {
    return gulp.src([
            'bower_components/bootstrap/fonts/*'
        ])
        .pipe(gulp.dest(buildDir + '/fonts'));
});

gulp.task('move-images', ['move-src'], function () {
    return gulp.src([
            'img/*'
        ])
        .pipe(gulp.dest(buildDir + '/img'));
});

gulp.task('default', [
    'optimize-js',
    'optimize-css',
    'move-fonts',
    'move-images'
]);