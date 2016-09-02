"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Initializable_1 = require("../../Abstracts/Initializable");
var Helpers_1 = require("../../../Helpers");
var Promise = require("bluebird");
/**
 * Material Class
 */
var Material = (function (_super) {
    __extends(Material, _super);
    function Material() {
        _super.apply(this, arguments);
        this.instances = {};
    }
    Object.defineProperty(Material.prototype, "collection", {
        get: function () {
            return require.context('../../Resources/Materials', true, /\.js$/);
        },
        enumerable: true,
        configurable: true
    });
    Material.prototype.initialize = function (instance) {
        var _this = this;
        var promises = [], keys = Object.keys(instance.textures);
        keys.forEach(function (key) { return promises.push(_this.app.loader.load(instance.textures[key])); });
        return Promise
            .all(promises)
            .then(function (resolutions) { return instance.create(Helpers_1.zip(resolutions, keys)); });
    };
    Material.prototype.update = function (time, delta) {
    };
    return Material;
}(Initializable_1.Initializable));
exports.Material = Material;
//# sourceMappingURL=Material.js.map