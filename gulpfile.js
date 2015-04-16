var umd = require('gulp-umd');
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var paths = {
	scripts: ['src/**/*.js']
};

gulp.task('build', function () {
	gulp.src(paths.scripts)
		.pipe(concat('restcase.js'))
		.pipe(umd())
		.pipe(gulp.dest('dist'));

	gulp.src(paths.scripts)
		.pipe(uglify())
		.pipe(concat('restcase.min.js'))
		.pipe(umd())
		.pipe(gulp.dest('dist'));
});