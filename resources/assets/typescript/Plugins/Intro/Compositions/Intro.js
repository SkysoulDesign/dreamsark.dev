"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Composition_1 = require("../Abstracts/Composition");
/**
 * Intro Composition
 */
var Intro = (function (_super) {
    __extends(Intro, _super);
    function Intro() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(Intro.prototype, "objects", {
        get: function () {
            return ['actress'];
        },
        enumerable: true,
        configurable: true
    });
    Intro.prototype.setup = function () {
        // console.log('hi')
    };
    Intro.prototype.stage = function (_a) {
        var actress = _a.actress;
        this.scene.add(actress);
    };
    Intro.prototype.update = function (_a, time, delta) {
        var actress = _a.actress;
        // actor.rotation.x += 0.02;
        // actor.rotation.y += 0.02;
        // actor.rotation.z += 0.02;
    };
    return Intro;
}(Composition_1.Composition));
exports.Intro = Intro;
//# sourceMappingURL=Intro.js.map