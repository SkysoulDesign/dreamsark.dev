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
    mix.browserify("./resources/assets/typescript/app.js", null, null, {
        cache: {},
        packageCache: {}
    });

});