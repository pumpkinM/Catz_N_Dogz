var gulp = require('gulp');

gulp.task(
	'default',
	[
		'clean',
		'css',
		'data',
		'images',
		'javascript'
	]
);
