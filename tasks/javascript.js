var gulp = require('gulp'),
	browserify = require('gulp-browserify'),
	plumber = require('gulp-plumber'),
	rename = require('gulp-rename'),
	watch = require('gulp-watch'),
	uglify = require('gulp-uglify');

gulp.task('javascript', function () {
	gulp
		.src(['./src/js/game.js'])
		.pipe(plumber())
		.pipe(browserify())
		.pipe(uglify())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('./dist/'));
});

gulp.task('watch:javascript', function() {
    watch(['./src/js/**/*.js'], function() {
        gulp.start(['javascript']);
    });
});
