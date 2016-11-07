var gulp = require('gulp'),
	watch = require('gulp-watch');

gulp.task('data', function () {
	gulp.src(['./data/**/*.json'])
		.pipe(gulp.dest('./dist/data'));
});

gulp.task('watch:data', function () {
	watch(['./data/**/*.json'], function() {
		gulp.start('data');
	});
});
