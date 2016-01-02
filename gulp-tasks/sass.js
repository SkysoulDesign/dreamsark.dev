module.exports = function (gulp, plugins, options) {

    /**
     * Set Defaults
     */
    var defaults = {
        versionalize: true,
        source: 'resources/assets/sass/app.scss',
        buildDestination: 'public/build/',
        destination: 'public/css/',
        live: true
    };

    /**
     * Extend Defaults
     */
    options = require('../gulp-tasks/utilities/extend.js')(defaults, options);

    /**
     * Listen To Live Reload if True
     */
    if (options.live) plugins.livereload.listen();

    return function () {

        gulp.src(options.source)
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.sass().on('error', plugins.sass.logError))
            .pipe(plugins.sourcemaps.write())
            .pipe(plugins.rename(function (path) {
                    if (options.name) path.basename = options.name;
                }
            ))

            .pipe(gulp.dest(options.destination))
            .pipe(plugins.livereload());

    };

};