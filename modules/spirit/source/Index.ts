#!/usr/bin/env node

import { Packer } from './Classes/Packer';
import { groupBy, keyBy, orderBy, sortBy } from 'lodash';

import { EngineInterface } from './Interfaces/EngineInterface';
import { GraphicsMagick } from './Engines/GraphicsMagick';
import { Image } from './Image';
import { OptionsInterface } from './interfaces/OptionsInterface';
import { PackerOld } from './Classes/PackerOld';
import { Sort } from './Sort';

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

const fs = require('fs');
const execFile = require('child_process').execFile;
const pngquant = require('pngquant-bin');
const calipers = require('calipers')('png', 'jpeg', 'webp', 'gif', 'svg');

const chalk = require('chalk');
const glob = require('glob'),
    layout = require('layout'),
    Promise = require('bluebird'),
    json = require('jsonfile'),
    PngQuant = require('pngquant');

class Spirit {

    private packer: Packer;
    private engine: EngineInterface;
    private output: any;

    get engines() {
        return {
            'gm': GraphicsMagick
        };
    };

    constructor(options: OptionsInterface) {

        const {optimize, output, name, format, engine, width, height, source, auto, margin} = options;

        this.packer = new PackerOld(width, height);
        this.engine = new this.engines[engine];
        this.output = {
            name, format, width, height, output, optimize, auto
        };

        glob(source).on('end', (files: string[]) => {

            Promise
                .map(files, path => {

                    return calipers.measure(path).then(function ({type, pages}) {
                        return new Image({
                            path: path,
                            type: type,
                            width: pages[0].width,
                            height: pages[0].height,
                            margin: margin
                        });
                    });

                }, { concurrency: 3 }).then((images: Image[]) => {

                    /**
                     * Prevent creating if any of the given images
                     * has width way bigger than the maxium specified
                     */
                    let {width, height} = this.output,
                        errors = [];

                    let totalWidth = 0,
                        totalHeight = 0;

                    for (let image of images) {

                        totalWidth += image.width;
                        totalHeight += image.height;

                        if (image.width > width || image.height > height) {
                            errors.push(
                                `Maximium Dimension Exceeded: ${image.path}' -> ${image.width}x${image.height} -> ${width}x${height}`
                            );
                        }

                    }

                    console.log(chalk.yellow(`Total Width: ${totalWidth}`))
                    console.log(chalk.yellow(`Total Height: ${totalHeight}`))

                    console.log(chalk.yellow(`You should sort by ` + (totalWidth < totalHeight ? 'Width' : 'Height') + ' for optimal results.'))

                    if (errors.length) {
                        throw errors;
                    }

                    return images;

                })
                .then(images => this.process(images))
                .catch(e => e.forEach(e => console.log(chalk.red(e))));

        });

    }

    process(images: Image[]) {

        let packaged = this.packer.pack(images, Sort.HEIGHT, this.output.auto);

        let {output, name, format, width, height, optimize} = this.output,
            pages = groupBy(packaged, 'bin'),
            promises = [];

        /**
         * Clean dir before start
         */
        let cleaner = glob(`${output}/${name}-*`).on('match', function (file) {
            fs.unlinkSync(file);
        })

        cleaner.on('end', () => {

            for (let num in pages) {

                const data = {
                    format, width, height, path: `${output}/${name}-${num}.${format}`,
                };

                let promise = this.engine.create(<Image[]>pages[num], data).then(function () {

                    if (optimize)
                        execFile(pngquant, ['--speed', 1, '--quality', '10-20', '-o', `${output}/${name}-${num}.min.${format}`, data.path], err => {
                            if (err) {
                                console.log('Ooops!', err);
                            }

                            console.log('done.');
                        });

                });

                let file = `${output}/${name}-${num}.json`,
                    meta = pages[num].map((image: Image) => image.export());

                json.writeFile(file, keyBy(meta, 'name'), { spaces: 2 }, function (error) {
                    if (error) {
                        console.log('ooops', error);
                    }
                });

                promises.push(promise);

            }

            Promise.all(promises).then(function () {
                console.log('Almost done.');
            });

        })
    }

}

json.readFile('spirit.json', function (error, config) {

    if (error) {
        return console.log(chalk.yellow('no spirit.json file found.'))
    }

    const spirit = new Spirit(config);

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