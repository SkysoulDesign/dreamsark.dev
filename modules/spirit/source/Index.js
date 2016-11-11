#!/usr/bin/env node
"use strict";
var lodash_1 = require('lodash');
var GraphicsMagick_1 = require('./Engines/GraphicsMagick');
var Image_1 = require('./Image');
var PackerOld_1 = require('./Classes/PackerOld');
var Sort_1 = require('./Sort');
// https://github.com/substack/minimist
// let lodash = require('lodash');
// lodash.
// let layout = require('layout');
// program
//     .arguments('<config>')
//     .option('-i, --input <file|path>', 'Input Path')
//     .option('-c, --config <path>', 'Configuration file, json format')
//     .action(function (file) {
//         console.log('user: %s pass: %s file: %s',
//             program.username, program.password, file);
//     })
//     .parse(process.argv);
var fs = require('fs');
var execFile = require('child_process').execFile;
var pngquant = require('pngquant-bin');
var calipers = require('calipers')('png', 'jpeg', 'webp', 'gif', 'svg');
var chalk = require('chalk');
var glob = require('glob'), layout = require('layout'), Promise = require('bluebird'), json = require('jsonfile'), PngQuant = require('pngquant');
var Spirit = (function () {
    function Spirit(options) {
        var _this = this;
        var optimize = options.optimize, output = options.output, name = options.name, format = options.format, engine = options.engine, width = options.width, height = options.height, source = options.source, auto = options.auto, margin = options.margin;
        this.packer = new PackerOld_1.PackerOld(width, height);
        this.engine = new this.engines[engine];
        this.output = {
            name: name, format: format, width: width, height: height, output: output, optimize: optimize, auto: auto
        };
        glob(source).on('end', function (files) {
            Promise
                .map(files, function (path) {
                return calipers.measure(path).then(function (_a) {
                    var type = _a.type, pages = _a.pages;
                    return new Image_1.Image({
                        path: path,
                        type: type,
                        width: pages[0].width,
                        height: pages[0].height,
                        margin: margin
                    });
                });
            }, { concurrency: 3 }).then(function (images) {
                /**
                 * Prevent creating if any of the given images
                 * has width way bigger than the maxium specified
                 */
                var _a = _this.output, width = _a.width, height = _a.height, errors = [];
                var totalWidth = 0, totalHeight = 0;
                for (var _i = 0, images_1 = images; _i < images_1.length; _i++) {
                    var image = images_1[_i];
                    totalWidth += image.width;
                    totalHeight += image.height;
                    if (image.width > width || image.height > height) {
                        errors.push("Maximium Dimension Exceeded: " + image.path + "' -> " + image.width + "x" + image.height + " -> " + width + "x" + height);
                    }
                }
                console.log(chalk.yellow("Total Width: " + totalWidth));
                console.log(chalk.yellow("Total Height: " + totalHeight));
                console.log(chalk.yellow("You should sort by " + (totalWidth < totalHeight ? 'Width' : 'Height') + ' for optimal results.'));
                if (errors.length) {
                    throw errors;
                }
                return images;
            })
                .then(function (images) { return _this.process(images); })
                .catch(function (e) { return e.forEach(function (e) { return console.log(chalk.red(e)); }); });
        });
    }
    Object.defineProperty(Spirit.prototype, "engines", {
        get: function () {
            return {
                'gm': GraphicsMagick_1.GraphicsMagick
            };
        },
        enumerable: true,
        configurable: true
    });
    ;
    Spirit.prototype.process = function (images) {
        var _this = this;
        var packaged = this.packer.pack(images, Sort_1.Sort.HEIGHT, this.output.auto);
        var _a = this.output, output = _a.output, name = _a.name, format = _a.format, width = _a.width, height = _a.height, optimize = _a.optimize, pages = lodash_1.groupBy(packaged, 'bin'), promises = [];
        /**
         * Clean dir before start
         */
        var cleaner = glob(output + "/" + name + "-*").on('match', function (file) {
            fs.unlinkSync(file);
        });
        cleaner.on('end', function () {
            var _loop_1 = function(num) {
                var data = {
                    format: format, width: width, height: height, path: output + "/" + name + "-" + num + "." + format,
                };
                var promise = _this.engine.create(pages[num], data).then(function () {
                    if (optimize)
                        execFile(pngquant, ['--speed', 1, '--quality', '10-20', '-o', (output + "/" + name + "-" + num + ".min." + format), data.path], function (err) {
                            if (err) {
                                console.log('Ooops!', err);
                            }
                            console.log('done.');
                        });
                });
                var file = output + "/" + name + "-" + num + ".json", meta = pages[num].map(function (image) { return image.export(); });
                json.writeFile(file, lodash_1.keyBy(meta, 'name'), { spaces: 2 }, function (error) {
                    if (error) {
                        console.log('ooops', error);
                    }
                });
                promises.push(promise);
            };
            for (var num in pages) {
                _loop_1(num);
            }
            Promise.all(promises).then(function () {
                console.log('Almost done.');
            });
        });
    };
    return Spirit;
}());
json.readFile('spirit.json', function (error, config) {
    if (error) {
        return console.log(chalk.yellow('no spirit.json file found.'));
    }
    var spirit = new Spirit(config);
});
// const spirit = new Spirit({
// source: './demo/**/*.{png,jpg}',
// output: 'assets',
// name: 'sprite',
// format: 'png',
// optimize: false,
// auto: true,
// width: 2048,
// height: 1024,
// engine: 'gm',
// }); 
//# sourceMappingURL=Index.js.map