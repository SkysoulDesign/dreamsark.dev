var elixir = require('laravel-elixir');

var watchify = require('watchify');

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
});