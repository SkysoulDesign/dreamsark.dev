"use strict";
var Helpers_1 = require("../../Helpers");
var Promise = require("bluebird");
/**
 * Loader Class
 */
var Loader = (function () {
    function Loader() {
        this.loaded = {};
    }
    Loader.prototype.boot = function (_a) {
        var manager = _a.manager;
        this.json = new THREE.JSONLoader(manager);
        this.anim = new THREE.XHRLoader(manager);
        var imageLoader = new THREE.TextureLoader(manager);
        this.png = imageLoader;
        this.jpg = imageLoader;
    };
    Loader.prototype.load = function (path) {
        var _this = this;
        var loader = Helpers_1.extension(path);
        if (!this.hasOwnProperty(loader))
            throw "Unknown loader: " + loader;
        return new Promise(function (accept, reject) {
            if (_this.loaded.hasOwnProperty(path)) {
                accept(_this.loaded[path].object, _this.loaded[path].material);
            }
            _this[loader].load(path, function (object, material) {
                /**
                 * Parse Json if loader is anim
                 */
                if (loader === 'anim')
                    object = JSON.parse(object);
                /**
                 * Store an instance on memory
                 */
                _this.loaded[path] = { object: object, material: material };
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