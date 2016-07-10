"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Components_1 = require("../Abstract/Components");
var Light = (function (_super) {
    __extends(Light, _super);
    function Light() {
        _super.call(this);
    }
    Light.prototype.boot = function (app) {
        this.scene = app.scene;
        var light = new THREE.AmbientLight(0xffffff);
        light.intensity = 3;
        console.log(light);
        this.scene.add(light);
    };
    Light.prototype.update = function (time, delta) {
    };
    return Light;
}(Components_1.Components));
exports.Light = Light;
//# sourceMappingURL=Light.js.map