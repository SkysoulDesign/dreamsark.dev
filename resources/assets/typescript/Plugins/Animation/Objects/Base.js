"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Character_1 = require("../Abstract/Character");
/**
 * Character: Base
 */
var Base = (function (_super) {
    __extends(Base, _super);
    function Base() {
        _super.apply(this, arguments);
    }
    Base.prototype.models = function () {
        return {
            base: '/models/Base.json',
        };
    };
    Base.prototype.create = function (models) {
        var material = this.material.get('baseMaterial').clone();
        material.skinning = false;
        return new THREE.Mesh(models.base, material);
    };
    return Base;
}(Character_1.Character));
exports.Base = Base;
//# sourceMappingURL=Base.js.map