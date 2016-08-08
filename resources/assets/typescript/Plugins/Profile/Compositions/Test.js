"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//author cloud
var AbstractComposition_1 = require("../Abstract/AbstractComposition");
/**
 * Main Composition
 */
var Test = (function (_super) {
    __extends(Test, _super);
    function Test() {
        _super.apply(this, arguments);
    }
    Test.prototype.stage = function (scene, camera, characters) {
        scene;
        camera;
        characters;
    };
    return Test;
}(AbstractComposition_1.AbstractComposition));
exports.Test = Test;
//# sourceMappingURL=Test.js.map