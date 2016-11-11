"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AbstractComposition_1 = require("../Abstract/AbstractComposition");
var Intro = (function (_super) {
    __extends(Intro, _super);
    function Intro() {
        _super.apply(this, arguments);
    }
    Intro.prototype.setup = function (animation) {
        var payload = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            payload[_i - 1] = arguments[_i];
        }
    };
    Intro.prototype.stage = function (scene, camera, objects) {
        console.log('yeah');
    };
    Intro.prototype.update = function (scene, camera, objects, time, delta) {
    };
    return Intro;
}(AbstractComposition_1.AbstractComposition));
exports.Intro = Intro;
//# sourceMappingURL=Intro.js.map