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
    Camera.prototype.moveTo = function (object, callback) {
        var distance = 200, clone = this.clone();
        clone.position.copy(object.position);
        clone.translateZ(200);
        // let matrix = new THREE.Matrix4();
        // matrix.setPosition(new THREE.Vector3(0, 10, 0))
        // this.position.applyMatrix4(matrix);
        // this.quaternion.copy(object.quaternion)
        // this.position.copy(object.position)
        // this.position.addScalar(-100)
        // this.lookAt(object.position)
        // let positions = object['geometry'].attributes.position.array;
        // let position = new THREE.Vector3(
        //     positions[0], positions[1], positions[2]
        // )
        // clone.position.set(position.x - distance, position.y - distance, position.z - distance);
        // this.lookAt(position);
        // this.position.copy(position);
        // this.position.z += -100
        var initialQuaternion = this.quaternion.clone();
        var endingQuaternion = object.quaternion;
        var targetQuaternion = new THREE.Quaternion();
        var animation = this.tween.animate({
            origin: {
                position: this.position
            },
            target: {
                position: {
                    x: clone.position.x,
                    y: clone.position.y,
                    z: clone.position.z,
                }
            },
            duration: 1,
            ease: Tween_1.Tween.QUADINOUT,
            after: callback,
            update: function (_a) {
                // this.position.x = position.x.value
                // this.position.y = position.y.value
                // this.position.z = position.z.value
                var position = _a.position, time = _a.time;
                // this.controls.instance.target.copy(
                //     new THREE.Vector3(
                //         position.x.value,
                //         position.y.value,
                //         position.z.value,
                //     )
                // )
                // this.position.x = position.x.value;
                // this.position.y = position.y.value;
                // this.position.z = position.z.value;
                // THREE.Quaternion.slerp(
                //     initialQuaternion, endingQuaternion, targetQuaternion, time.value
                // );
                // this.setRotationFromQuaternion(targetQuaternion);
            }
        });
    };
    return Camera;
}(THREE.PerspectiveCamera));
exports.Camera = Camera;
//# sourceMappingURL=Camera.js.map