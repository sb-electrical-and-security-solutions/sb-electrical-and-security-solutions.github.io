var gulp = require('gulp');
var styleLint = require('gulp-stylelint');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');

gulp.task('lint', function() {
    return gulp.src("sass/**/*.scss")
        .pipe(styleLint({
            reporters: [
                {formatter: 'string', console: true}
            ]
        }));
});

gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: true
    });

    gulp.watch("sass/**/*.scss", ['sass']);
    gulp.watch("**/*.html").on('change', browserSync.reload);
});

gulp.task('sass', function() {
    var plugins = [
        autoprefixer({browsers: ['last 2 versions']}),
        cssnano()
    ];
    return gulp.src("sass/main.scss")
        .pipe(sass())
        .pipe(postcss(plugins))
        .pipe(gulp.dest("css"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
