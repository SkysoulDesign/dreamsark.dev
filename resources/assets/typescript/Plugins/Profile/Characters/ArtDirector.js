"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Character_1 = require("../Abstract/Character");
/**
 * Character: ArtDirector
 */
var ArtDirector = (function (_super) {
    __extends(ArtDirector, _super);
    function ArtDirector() {
        _super.apply(this, arguments);
        this.defer = true;
    }
    ArtDirector.prototype.models = function () {
        return {
            character: '/models/ArtDirector.json',
        };
    };
    ArtDirector.prototype.create = function (models) {
        var materials = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            materials[_i - 1] = arguments[_i];
        }
        materials.forEach(function (material) {
            material.skinning = true;
        });
        var mesh = new THREE.SkinnedMesh(models.character, materials[0]);
        var action = {};
        var mixer = this.animator.create(mesh);
        action.idle = mixer.clipAction(models.character.animations[0]);
        action.idle.setEffectiveWeight(1);
        action.idle.play();
        mesh.position.setY(-25);
        mesh.rotation.y = Math.PI;
        console.log(models.character.animations);
        return mesh;
    };
    ArtDirector.prototype.material = function () {
        return new THREE.MeshBasicMaterial({
            color: 0xff0000, wireframe: true
        });
    };
    return ArtDirector;
}(Character_1.Character));
exports.ArtDirector = ArtDirector;
//# sourceMappingURL=ArtDirector.js.map