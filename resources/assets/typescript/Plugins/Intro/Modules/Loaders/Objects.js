"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Initializable_1 = require("../../Abstracts/Initializable");
var Promise = require("bluebird");
/**
 * Objects Class
 */
var Objects = (function (_super) {
    __extends(Objects, _super);
    function Objects() {
        _super.apply(this, arguments);
        this.instances = {};
    }
    Object.defineProperty(Objects.prototype, "collection", {
        get: function () {
            return require.context('../../Resources/Objects', true, /\.js$/);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Initialize Object
     */
    Objects.prototype.initialize = function (instance) {
        var loaders = {
            0: this.app.model,
            1: this.app.material,
            2: this.app.animation
        };
        return Promise
            .map([instance.models, instance.materials, instance.animations], function (item, index) {
            return item ? loaders[index].load(item) : null;
        })
            .then(function (resolutions) { return instance.create.apply(instance, resolutions); });
    };
    return Objects;
}(Initializable_1.Initializable));
exports.Objects = Objects;
//# sourceMappingURL=Objects.js.map