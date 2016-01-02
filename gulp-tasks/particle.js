module.exports = function (gulp, plugins, options) {

    /**
     * Set Defaults
     */
    var defaults = {
        source: 'resources/assets/js/Particle.js',
        destination: 'public/js/',
        buildDestination: 'public/build/'
    };

    /**
     * Extend Defaults
     */
    options = require('../gulp-tasks/utilities/extend.js')(defaults, options);

    return function () {
        gulp.src(options.source)
            .pipe(plugins.browserify())
            .pipe(plugins.rename(function (path) {
                    if (options.name) path.basename = options.name;
                }
            ))

            .pipe(gulp.dest(options.destination))
            .pipe(plugins.livereload());

    };

};