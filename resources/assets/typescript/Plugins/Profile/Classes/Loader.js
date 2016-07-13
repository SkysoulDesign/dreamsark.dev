"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Components_1 = require("../Abstract/Components");
var Helpers_1 = require("../../Helpers");
/**
 * Loaders
 */
require('../../../../../../node_modules/three/examples/js/loaders/FBXLoader');
/**
 * Loader Class
 */
var Loader = (function (_super) {
    __extends(Loader, _super);
    function Loader() {
        _super.apply(this, arguments);
        this.loaded = {};
        this.queue = [];
        this.working = false;
    }
    Loader.prototype.boot = function (app) {
        // this.fbx = new THREE.FBXLoader(app.manager);
        this.json = new THREE.JSONLoader(app.manager);
        var imageLoader = new THREE.TextureLoader(app.manager);
        this.png = imageLoader;
        this.jpg = imageLoader;
    };
    Loader.prototype.load = function (path, callback) {
        var loader = Helpers_1.extension(path);
        if (!this.hasOwnProperty(loader)) {
            return window['dreamsark'].logger.error("Unknown loader:", loader);
        }
        this.queue.push({
            loader: loader, path: path, callback: callback
        });
    };
    Loader.prototype.process = function () {
        var _this = this;
        if (this.working || this.queue.length < 1)
            return;
        this.working = true;
        var item = this.queue.shift();
        if (this.loaded.hasOwnProperty(item.path)) {
            item.callback(this.loaded[item.path].object, this.loaded[item.path].material);
            window['dreamsark'].logger.info('Item already in cache, loading it instead.', item.path);
            return this.working = false;
        }
        this[item.loader].load(item.path, function (object, material) {
            /**
             * Store an instance on memory
             * @type {{object: any, material: any}}
             */
            _this.loaded[item.path] = {
                object: object, material: material
            };
            item.callback(object, material);
            _this.working = false;
        }, function () { }, function (error) {
            // this.queue.push(item);
            _this.working = false;
        });
    };
    return Loader;
}(Components_1.Components));
exports.Loader = Loader;
//# sourceMappingURL=Loader.js.map