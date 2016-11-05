var gulp = require('gulp');

gulp.task('watch',
	[
		'watch:javascript',
		'watch:css',
		'watch:images'
	]
);
