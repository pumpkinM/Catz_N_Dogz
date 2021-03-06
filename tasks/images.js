var gulp = require('gulp'),
	watch = require('gulp-watch');

gulp.task('images', function () {
	gulp.src(['./src/images/**/*{svg,png,jpg,jpeg,gif}'])
		.pipe(gulp.dest('./dist/images'));
});

gulp.task('watch:images', function () {
	watch(['./src/images/**/*{svg,png,jpg,jpeg,gif}'], function() {
		gulp.start('images');
	})
});
