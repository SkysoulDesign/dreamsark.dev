"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Camera Class
 */
var Camera = (function (_super) {
    __extends(Camera, _super);
    function Camera() {
        _super.apply(this, arguments);
    }
    Camera.prototype.boot = function (app) {
        this.fov = 20;
        this.aspect = app.browser.aspect;
        this.near = 1;
        this.far = 2000;
        this.position.z = 500;
        this.updateProjectionMatrix();
    };
    Camera.prototype.update = function (time, delta) {
    };
    return Camera;
}(THREE.PerspectiveCamera));
exports.Camera = Camera;
//# sourceMappingURL=Camera.js.map