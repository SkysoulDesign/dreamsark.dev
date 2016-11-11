"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AbstractComposition_1 = require("../Abstract/AbstractComposition");
var Helpers_1 = require("../../Helpers");
/**
 * Project Class
 */
var core;
var Test = (function (_super) {
    __extends(Test, _super);
    function Test() {
        _super.apply(this, arguments);
    }
    Test.prototype.setup = function (app) {
        var payload = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            payload[_i - 1] = arguments[_i];
        }
    };
    Test.prototype.stage = function (scene, camera, objects) {
        var buffer = new THREE.BufferGeometry(), positions = new Float32Array(50 * 3), material = new THREE.PointsMaterial({
            size: 10,
            sizeAttenuation: true,
        });
        for (var i = 0; i < positions.length / 3; i++) {
            positions[i * 3] = Helpers_1.random(200, 100);
            positions[i * 3 + 1] = Helpers_1.random(200, 100);
            positions[i * 3 + 2] = Helpers_1.random(200, 100);
        }
        buffer.addAttribute('position', new THREE.BufferAttribute(positions, 3).setDynamic(true));
        core = new THREE.Points(buffer, material);
        scene.add(core);
    };
    Test.prototype.update = function (scene, camera, objects, time, delta) {
        var positions = core.geometry.getAttribute('position');
        // for (let i = 0; i < positions.count; i++) {
        //     positions.array[i * 3] += random(0.2, 1);
        //     positions.array[i * 3 + 1] += random(0.2, 1);
        //     positions.array[i * 3 + 2] += random(0.2, 1);
        //
        //     if (positions.array[i * 3] > 100) {
        //         positions.array[i * 3] = 0
        //         positions.array[i * 3 + 1] = 0
        //         positions.array[i * 3 + 2] = 0
        //     }
        //
        // }
        positions.needsUpdate = true;
    };
    return Test;
}(AbstractComposition_1.AbstractComposition));
exports.Test = Test;
//# sourceMappingURL=Test.js.map