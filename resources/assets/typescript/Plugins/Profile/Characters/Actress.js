"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Character_1 = require("../Abstract/Character");
/**
 * Character: Actress
 */
var Actress = (function (_super) {
    __extends(Actress, _super);
    function Actress() {
        _super.apply(this, arguments);
    }
    Actress.prototype.models = function () {
        return {
            character: '/models/Actress.json',
        };
    };
    Actress.prototype.create = function (models) {
        var materials = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            materials[_i - 1] = arguments[_i];
        }
        var mesh = new THREE.SkinnedMesh(models.character, this.material.get('baseMaterial'));
        var actions = {}, mixer = this.animator.create(mesh);
        this.animation.get('baseAnimation', models.character.bones, mixer).then(function (animations) {
            animations.base.idleBody.play();
            animations.base.lookAround.play();
        });
        /**
         * Play All Animations
         */
        models.character.animations.forEach(function (animation) {
            animation.skinning = true;
            actions[animation.name] = mixer.clipAction(animation);
            actions[animation.name].play();
        });
        mesh.position.setY(-25);
        mesh.rotation.y = Math.PI;
        return mesh;
    };
    return Actress;
}(Character_1.Character));
exports.Actress = Actress;
//# sourceMappingURL=Actress.js.map