var gulp = require('gulp'),
	del = require('del');

gulp.task('clean', function() {
	del.sync('./dist', {
		force: true
	});
});
