"use strict";
var Helpers_1 = require("../../Helpers");
var Promise = require("bluebird");
/**
 * Loader Class
 */
var Loader = (function () {
    function Loader() {
        /**
         * Keep Track of all promises made.. its just like a cache..
         */
        this.promises = {};
    }
    Loader.prototype.boot = function (_a) {
        var manager = _a.manager;
        this.json = new THREE.JSONLoader(manager);
        this.anim = new THREE.XHRLoader(manager);
        this.obj = new THREE.ObjectLoader(manager);
        var imageLoader = new THREE.TextureLoader(manager);
        this.png = imageLoader;
        this.jpg = imageLoader;
    };
    Loader.prototype.load = function (path) {
        var _this = this;
        var loader = Helpers_1.extension(path);
        if (!this.hasOwnProperty(loader))
            throw "Unknown loader: " + loader;
        /**
         * If Promise has already been made... then... just give it back..
         */
        if (this.promises.hasOwnProperty(path))
            return this.promises[path];
        return this.promises[path] = new Promise(function (accept, reject) {
            _this[loader].load(path, function (object, material) {
                /**
                 * Parse Json if loader is anim
                 */
                if (loader === 'anim')
                    object = JSON.parse(object);
                accept(object, material);
            }, _this.progress, reject);
        });
    };
    Loader.prototype.progress = function (event) {
    };
    Loader.prototype.update = function (time, delta) {
    };
    return Loader;
}());
exports.Loader = Loader;
//# sourceMappingURL=Loader.js.map