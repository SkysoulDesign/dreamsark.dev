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
        return new THREE.MeshStandardMaterial({
            skinning: true,
            shading: THREE.FlatShading,
            roughness: 1,
            metalness: 1
        });
    };
    return BaseMaterial;
}(AbstractMaterial_1.AbstractMaterial));
exports.BaseMaterial = BaseMaterial;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZU1hdGVyaWFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQmFzZU1hdGVyaWFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGlDQUErQiw4QkFBOEIsQ0FBQyxDQUFBO0FBRTlEOztHQUVHO0FBQ0g7SUFBa0MsZ0NBQWdCO0lBQWxEO1FBQWtDLDhCQUFnQjtJQXNCbEQsQ0FBQztJQXBCRywrQkFBUSxHQUFSO1FBQ0ksTUFBTSxDQUFDO1lBQ0gsSUFBSSxFQUFFLHFCQUFxQjtTQUM5QixDQUFBO0lBQ0wsQ0FBQztJQUVELDZCQUFNLEdBQU4sVUFBTyxRQUFRLEVBQUUsUUFBUTtRQUNyQixRQUFRLENBQUMsR0FBRyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFDN0IsUUFBUSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7SUFDaEMsQ0FBQztJQUVELCtCQUFRLEdBQVI7UUFDSSxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsb0JBQW9CLENBQUM7WUFDbEMsUUFBUSxFQUFFLElBQUk7WUFDZCxPQUFPLEVBQUUsS0FBSyxDQUFDLFdBQVc7WUFDMUIsU0FBUyxFQUFFLENBQUM7WUFDWixTQUFTLEVBQUUsQ0FBQztTQUNmLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFTCxtQkFBQztBQUFELENBQUMsQUF0QkQsQ0FBa0MsbUNBQWdCLEdBc0JqRDtBQXRCWSxvQkFBWSxlQXNCeEIsQ0FBQSJ9