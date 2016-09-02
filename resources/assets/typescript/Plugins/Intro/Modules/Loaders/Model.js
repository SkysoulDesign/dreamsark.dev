"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Initializable_1 = require("../../Abstracts/Initializable");
/**
 * Model Class
 */
var Model = (function (_super) {
    __extends(Model, _super);
    function Model() {
        _super.apply(this, arguments);
        this.instances = {};
    }
    Object.defineProperty(Model.prototype, "collection", {
        get: function () {
            return function () {
            };
        },
        enumerable: true,
        configurable: true
    });
    Model.prototype.initialize = function (path) {
        return this.app.loader.load(path);
    };
    Model.prototype.update = function (time, delta) {
    };
    return Model;
}(Initializable_1.Initializable));
exports.Model = Model;
//# sourceMappingURL=Model.js.map