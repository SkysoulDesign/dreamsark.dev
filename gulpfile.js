var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'gulp.*', 'rev-del']
});

/**
 * Get Tasks Function
 **/
function getTask(task, options) {
    return require('./gulp-tasks/' + task)(gulp, plugins, options);
}

/**
 * Three Js Task
 **/
gulp.task('intro', getTask('intro', {name: 'intro'}));
gulp.watch('resources/assets/intro/**/*.js', ['intro']);

/**
 * Start Task
 **/
gulp.task('start', getTask('start', {name: 'start'}));
gulp.watch('resources/assets/start/**/*.js', ['start']);

/**
 * Dev JS Task
 **/
gulp.task('dev', getTask('dev', {name: 'dev'}));
gulp.watch('resources/assets/dev/**/*.js', ['dev']);

/**
 * Sass Task
 **/
gulp.task('sass', getTask('sass', {name: 'app'}));
gulp.watch('resources/assets/sass/**/*.scss', ['sass']);

/**
 * Js Task
 **/
gulp.task('js', getTask('js', {name: 'app'}));
gulp.watch('resources/assets/js/**/*.js', ['js']);

/**
 * Particle
 **/
gulp.task('particle', getTask('particle', {name: 'particle'}));
gulp.watch('resources/assets/js/Particle.js', ['particle']);

gulp.task('view', function () {
    plugins.livereload.listen();
    gulp.watch('resources/views/**/*.php');
});

gulp.task('view', function () {
    plugins.livereload.listen();
    gulp.watch('resources/views/**/*.php');
});

gulp.task('live', function () {
    plugins.livereload.listen();
    gulp.watch(['public/js/**/*.js', 'public/css/**/*.css']);
});

