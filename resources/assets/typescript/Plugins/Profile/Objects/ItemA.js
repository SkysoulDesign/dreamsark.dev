"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Character_1 = require("../Abstract/Character");
/**
 * Character: Actor
 */
var ItemA = (function (_super) {
    __extends(ItemA, _super);
    function ItemA() {
        _super.apply(this, arguments);
    }
    ItemA.prototype.models = function () {
        return {
            character: '/models/3DArtist.json',
        };
    };
    ItemA.prototype.create = function (models) {
        var material = this.material.get('itemMaterial'), l_Geometry = new THREE.PlaneGeometry(10, 10);
        return new THREE.Mesh(l_Geometry, material);
    };
    return ItemA;
}(Character_1.Character));
exports.ItemA = ItemA;
//# sourceMappingURL=ItemA.js.map