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
    mix.browserify("./resources/assets/typescript/App.js", null, null, {
        cache: {}, packageCache: {}
    });

    /**
     * Profile Script
     */
    mix.browserify("./resources/assets/typescript/Plugins/Profile/Profile.js", 'public/js/plugins/profile.js', null, {
        cache: {}, packageCache: {}
    });

    mix.browserSync({
        open:   "ui",
        notify: false,
        proxy:  {
            target: "dreamsark.dev:8080"
        },
        port:   8080
    });
});
