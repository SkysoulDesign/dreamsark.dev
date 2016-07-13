"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Scene Class
 */
var Scene = (function (_super) {
    __extends(Scene, _super);
    function Scene() {
        _super.call(this);
        this.fog = new THREE.FogExp2(0xe1f8ff, .002345);
    }
    Scene.prototype.boot = function (app) {
    };
    return Scene;
}(THREE.Scene));
exports.Scene = Scene;
//# sourceMappingURL=Scene.js.map