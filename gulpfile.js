// gulp
var gulp = require('gulp');

// plugins
var connect = require('gulp-connect');
var slim = require('gulp-slim');
var sass = require('gulp-sass');
var ts = require('gulp-typescript');
var watch = require('gulp-watch');
var del = require('del');
var plumber = require('gulp-plumber');

// tasks
gulp.task('connect', function () {
    connect.server({
        root: 'build/',
        port: 8888
    });
});

gulp.task('clean', function() {
    del([
        './build/*'
    ]);
});

gulp.task('slim', function () {
    gulp.src('./app/views/**/*.slim')
        .pipe(slim())
        .pipe(gulp.dest('build'));
});

gulp.task('sass', function () {
    gulp.src('./app/styles/**/*.scss')
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(sass())
        .pipe(gulp.dest('build/css'));
});

gulp.task('ts', function () {
    gulp.src('./app/scripts/**/*.ts')
        .pipe(ts({
            target: 'ES5',
            out: 'bundle.js'
        }))
        .pipe(gulp.dest('build/js/'));
});

gulp.task('vendors', function () {
    gulp.src('./app/bower_components/angular/angular*.js')
        .pipe(gulp.dest('build/vendors/angular'));
    gulp.src([
        './app/bower_components/angular-material/angular*.js',
        './app/bower_components/angular-material/angular*.css'
        ])
        .pipe(gulp.dest('build/vendors/angular-material'));
    gulp.src('./app/bower_components/angular-animate/angular*.js')
        .pipe(gulp.dest('build/vendors/angular-animate'));
    gulp.src('./app/bower_components/angular-aria/angular*.js')
        .pipe(gulp.dest('build/vendors/angular-aria'));
});

gulp.task('build', ['vendors', 'slim', 'sass', 'ts'], function () {

});

gulp.task('watch', function () {
    gulp.watch('./app/styles/**/*.scss', ['sass']);
    gulp.watch('./app/views/**/*.slim', ['slim']);
    gulp.watch('./app/scripts/**/*.ts', ['ts']);
});

gulp.task('default', ['build', 'connect', 'watch'], function () {

});