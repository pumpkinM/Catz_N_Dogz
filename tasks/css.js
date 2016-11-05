var gulp = require('gulp'),
	sass = require('gulp-sass'),
	watch = require('gulp-watch'),
	rename = require('gulp-rename'),
	cleanCSS = require('gulp-clean-css');

gulp.task('css', function () {
	gulp.src(['./src/css/main.scss'])
		.pipe(sass().on('error', sass.logError))
		.pipe(cleanCSS())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('./dist'));
});

gulp.task('watch:css', function() {
	watch(['./src/css/**/*.scss'], function() {
		gulp.start('css');
	});
});
