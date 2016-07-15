"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AbstractMaterial_1 = require("../Abstract/AbstractMaterial");
/**
 * BaseMaterial Class
 */
var BaseMaterial = (function (_super) {
    __extends(BaseMaterial, _super);
    function BaseMaterial() {
        _super.apply(this, arguments);
    }
    BaseMaterial.prototype.textures = function () {
        return {
            base: '/models/texture.png'
        };
    };
    BaseMaterial.prototype.loaded = function (material, textures) {
        material.map = textures.base;
        material.needsUpdate = true;
    };
    BaseMaterial.prototype.material = function () {
        return new THREE.MeshBasicMaterial({
            skinning: true,
            shading: THREE.FlatShading
        });
    };
    return BaseMaterial;
}(AbstractMaterial_1.AbstractMaterial));
exports.BaseMaterial = BaseMaterial;
//# sourceMappingURL=BaseMaterial.js.map