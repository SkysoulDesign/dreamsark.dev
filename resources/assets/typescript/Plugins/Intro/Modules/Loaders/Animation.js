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
 * Animation Class
 */
var Animation = (function (_super) {
    __extends(Animation, _super);
    function Animation() {
        _super.apply(this, arguments);
        this.instances = {};
    }
    Object.defineProperty(Animation.prototype, "collection", {
        get: function () {
            return require.context('../../Resources/Animations', true, /\.js$/);
        },
        enumerable: true,
        configurable: true
    });
    Animation.prototype.initialize = function (instance) {
        var _this = this;
        var promises = [], keys = Object.keys(instance.animations);
        keys.forEach(function (key) { return promises.push(_this.app.loader.load(instance.animations[key])); });
        return Promise
            .all(promises)
            .then(function (resolutions) { return instance.create(Helpers_1.zip(resolutions, keys)); });
    };
    Animation.prototype.update = function (time, delta) {
    };
    return Animation;
}(Initializable_1.Initializable));
exports.Animation = Animation;
//# sourceMappingURL=Animation.js.map