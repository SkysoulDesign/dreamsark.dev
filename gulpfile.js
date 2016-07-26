process.env.DISABLE_NOTIFIER = true;

var elixir = require('laravel-elixir');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */
elixir.config.js.browserify.watchify.enabled = true;

elixir(function (mix) {
    mix.sass('app.scss');
    mix.browserify("./resources/assets/typescript/App.js");

    var pluginsPath = 'public/js/plugins';

    /**
     * Profile Script
     */
    mix.browserify("./resources/assets/typescript/Plugins/Profile/Profile.js", pluginsPath)
        .browserify("./resources/assets/typescript/Plugins/Chart.js", pluginsPath)
        .browserify("./resources/assets/typescript/Plugins/ProgressBar.js", pluginsPath)

        .browserify("./resources/assets/typescript/Plugins/Medium.js", pluginsPath)
        .styles([
            './node_modules/medium-editor/dist/css/medium-editor.min.css',
            './node_modules/medium-editor/dist/css/themes/default.min.css',
            './node_modules/medium-editor-tables/dist/css/medium-editor-tables.css',
        ], 'public/css/plugins/medium/medium.css')

    /**
     * Copy FontAwesome Font
     */
    mix.copy('node_modules/font-awesome/fonts', 'public/fonts')

    mix.browserSync({
        open: "ui",
        notify: false,
        proxy: {
            target: "dreamsark.dev:8080"
        },
        port: 8080
    });
});
