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
var ItemMaterial = (function (_super) {
    __extends(ItemMaterial, _super);
    function ItemMaterial() {
        _super.apply(this, arguments);
    }
    ItemMaterial.prototype.textures = function () {
        return {
            base: '/img/default.png'
        };
    };
    ItemMaterial.prototype.loaded = function (material, textures) {
        material.map = textures.base;
        material.needsUpdate = true;
    };
    ItemMaterial.prototype.material = function () {
        return new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide
        });
    };
    return ItemMaterial;
}(AbstractMaterial_1.AbstractMaterial));
exports.ItemMaterial = ItemMaterial;
//# sourceMappingURL=ItemMaterial.js.map