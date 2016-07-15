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
        var light = new THREE.AmbientLight(0xffffff);
        light.intensity = .9;
        // let hemisphereLight = new THREE.HemisphereLight(0xaaaaaa,0x000000, .9)
        // let ambientLight = new THREE.AmbientLight(0xffffff, .9);
        var hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, .9), ambientLight = new THREE.AmbientLight(0xffffff, .3), shadowLight = new THREE.DirectionalLight(0xffffff, .3);
        shadowLight.name = 'shadowLight';
        shadowLight.position.set(0, 100, -350);
        shadowLight.castShadow = false;
        // hemisphereLight.position.setZ(-300)
        // hemisphereLight.position.setZ(-300)
        // let helper = new THREE.HemisphereLightHelper(hemisphereLight, 10)
        // this.scene.add(
        //     hemisphereLight, ambientLight, shadowLight
        // );
    };
    Light.prototype.update = function (time, delta) {
    };
    return Light;
}(Components_1.Components));
exports.Light = Light;
//# sourceMappingURL=Light.js.map