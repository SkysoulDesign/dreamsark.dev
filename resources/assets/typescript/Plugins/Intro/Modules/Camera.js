"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Tween_1 = require("./Tween");
/**
 * Camera Class
 */
var Camera = (function (_super) {
    __extends(Camera, _super);
    function Camera() {
        _super.apply(this, arguments);
    }
    Camera.prototype.boot = function (_a) {
        var tween = _a.tween, browser = _a.browser, controls = _a.controls;
        this.tween = tween;
        this.controls = controls;
        this.fov = 20;
        this.aspect = browser.aspect;
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
    Camera.prototype.moveTo = function (object, callback, distance, duration, ease) {
        if (distance === void 0) { distance = 200; }
        if (duration === void 0) { duration = 1; }
        if (ease === void 0) { ease = Tween_1.Tween.CUBICIN; }
        var original = object instanceof THREE.Object3D ? object.position : object, clone = this.clone();
        clone.position.copy(original);
        clone.translateZ(distance);
        var animation = this.tween.animate({
            origin: {
                position: this.position
            },
            target: {
                position: {
                    x: clone.position.x,
                    y: clone.position.y,
                    z: clone.position.z
                }
            },
            duration: duration,
            ease: ease,
            after: callback
        });
    };
    return Camera;
}(THREE.PerspectiveCamera));
exports.Camera = Camera;
//# sourceMappingURL=Camera.js.map