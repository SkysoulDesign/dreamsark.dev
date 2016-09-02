// process.env.DISABLE_NOTIFIER = true;

// var elixir = require('laravel-elixir');
// var fontmin = require('gulp-fontmin');
// var gulp = require('gulp');
//
// gulp.task('default', function () {
//     return gulp.src('./public/fonts2/**/*.ttf')
//         .pipe(fontmin({
//             text: 'project',
//         }))
//         .pipe(gulp.dest('./public/fonts'));
// });

// elixir.ready(function () {
//     elixir.config.js.webpack = {
//         loaders: [
//             {
//                 test: /\.html$/, loader: 'raw',
//             },
//             {
//                 test: /\.ttf$/,
//                 loader: 'url'
//             },
//             {
//                 test: /\.ttf$/,
//                 loader: 'font-subset',
//                 query: {glyphs: 'abc!'}
//             }
//         ],
//     }
// })

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
// elixir.config.js.browserify.watchify.enabled = true;

// elixir(function (mix) {
//
//     mix.sass('app.scss');
//     mix.webpack("./resources/assets/typescript/App.js");
//     mix.webpack('./resources/assets/intro/App.js', 'public/js/intro.js');
//
//     var pluginsPath = 'public/js/plugins';
//
//     /**
//      * Profile Script
//      */
//     mix.webpack("./resources/assets/typescript/Plugins/Profile/Profile.js", pluginsPath)
//         .webpack("./resources/assets/typescript/Plugins/Chart.js", pluginsPath)
//         .webpack("./resources/assets/typescript/Plugins/ProgressBar.js", pluginsPath)
//
//     // mix.browserify("./resources/assets/typescript/Plugins/Items/Item.js", pluginsPath)
//         // .browserify("./resources/assets/typescript/Plugins/Items/ItemCombineView.js", pluginsPath)
//         // .browserify("./resources/assets/typescript/Plugins/Items/MyThreeJS.js", pluginsPath)
//
//         .webpack("./resources/assets/typescript/Plugins/Medium.js", pluginsPath)
//         .styles([
//             './node_modules/medium-editor/dist/css/medium-editor.min.css',
//             './node_modules/medium-editor/dist/css/themes/default.min.css',
//             './node_modules/medium-editor-tables/dist/css/medium-editor-tables.css',
//         ], 'public/css/plugins/medium/medium.css')
//
//         .webpack("./resources/assets/typescript/Plugins/DateTime.js", pluginsPath)
//         .styles([
//             './node_modules/flatpickr/dist/flatpickr.dark.min.css',
//         ], 'public/css/plugins/datetime/datetime.css')
//
//     /**
//      * Copy FontAwesome Font
//      */
//     mix.copy('node_modules/font-awesome/fonts', 'public/fonts')
//
//     mix.browserSync({
//         open: "ui",
//         notify: false,
//         proxy: {
//             target: "dreamsark.dev:8080"
//         },
//         port: 8080
//     });
//
// });

var gulp = require('gulp');
var webpack = require('gulp-webpack');

gulp.task('app', function () {
    return gulp.src('./resources/assets/typescript/*.js')
        .pipe(webpack({
            watch: true,
            devtool: 'inline-source-map',
            entry: {
                app: './resources/assets/typescript/App.js',
            },
            output: {
                filename: "[name].js"
            }
        }))
        .pipe(gulp.dest('public/js/'));
});

/**
 * Compile Plugins
 */
gulp.task('plugins', function () {
    return gulp.src('./resources/assets/typescript/Plugins/*.js')
        .pipe(webpack({
            watch: true,
            // devtool: 'inline-source-map',
            entry: {
                // progressBar: './resources/assets/typescript/Plugins/ProgressBar.js',
                // medium: './resources/assets/typescript/Plugins/Medium.js',
                // chart: './resources/assets/typescript/Plugins/Chart.js',
                // animation: './resources/assets/typescript/Plugins/Animation/Animation.js',
                intro: './resources/assets/typescript/Plugins/Intro/Intro.js',
            },
            output: {
                filename: "[name].js"
            }
        }))
        .pipe(gulp.dest('public/js/plugins/'));
});


gulp.task('default', ['app', 'plugins']);
