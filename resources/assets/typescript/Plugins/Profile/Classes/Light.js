"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Components_1 = require("../Abstract/Components");
/**
 * Class Light
 */
var Light = (function (_super) {
    __extends(Light, _super);
    function Light() {
        _super.apply(this, arguments);
    }
    Light.prototype.boot = function (app) {
        this.scene = app.scene;
        this.camera = app.camera;
        var light = new THREE.AmbientLight(0xffffff);
        light.intensity = .9;
        var hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, 1);
        var ambientLight = new THREE.AmbientLight(0xf0ecf6, 1);
        // let hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, .9),
        //     ambientLight = new THREE.AmbientLight(0xffffff, .3),
        var shadowLight = new THREE.DirectionalLight(0xffffff, 1);
        shadowLight.name = 'shadowLight';
        shadowLight.position.set(0, 100, -350);
        shadowLight.castShadow = true;
        // hemisphereLight.position.setZ(-300)
        // hemisphereLight.position.setZ(-300)
        var shadow = new THREE.LightShadow(this.camera);
        shadowLight.position.set(100, 100, -300);
        var left = shadowLight.clone();
        left.intensity = 2.5;
        left.position.set(100, 0, 100);
        left.color.setHex(0xafe1fe);
        var right = shadowLight.clone();
        right.intensity = 3;
        right.position.set(-100, 0, -100);
        right.color.setHex(0xfef1af);
        this.scene.add(ambientLight, shadowLight, left, right);
    };
    Light.prototype.update = function (time, delta) {
    };
    return Light;
}(Components_1.Components));
exports.Light = Light;
//# sourceMappingURL=Light.js.map