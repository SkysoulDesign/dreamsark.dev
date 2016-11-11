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
    /**
     * Calculate view port size within a given distance
     *
     * @param distance
     * @returns {width: number, height: number}
     */
    Camera.prototype.getViewSize = function (distance) {
        var fov = this.fov * Math.PI / 180, depth = -(this.far / 2 + ((-(this.position.z / 2) - this.far / 2) / 100) * distance), height = 2 * Math.tan(fov / 2) * (this.position.z - depth), width = height * this.aspect;
        return {
            width: width, height: height, depth: depth
        };
    };
    return Camera;
}(THREE.PerspectiveCamera));
exports.Camera = Camera;
//# sourceMappingURL=Camera.js.map