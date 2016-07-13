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
var Loader = (function (_super) {
    __extends(Loader, _super);
    function Loader() {
        _super.apply(this, arguments);
    }
    Loader.prototype.boot = function (app) {
        this.fbx = new THREE.FBXLoader(app.manager);
        this.json = new THREE.JSONLoader(app.manager);
    };
    Loader.prototype.load = function (path, callback) {
        var ext = this[Helpers_1.extension(path)];
        if (this.hasOwnProperty(ext)) {
            return this.app.logger.error("Unknown loader", ext);
        }
        this[Helpers_1.extension(path)].load(path, callback);
    };
    return Loader;
}(Components_1.Components));
exports.Loader = Loader;
//# sourceMappingURL=Loader.js.map