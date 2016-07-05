var gulp = require('gulp');
var browserify = require('gulp-browserify');

gulp.task('default', function() {
    gulp.src('./app.js')
        .pipe(browserify({
            insertGlobals : true
        }))
        .pipe(gulp.dest('./translation-assets'))
});
