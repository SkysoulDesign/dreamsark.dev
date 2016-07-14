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
var ArtDirector = (function (_super) {
    __extends(ArtDirector, _super);
    function ArtDirector() {
        _super.apply(this, arguments);
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
        var mesh = new THREE.SkinnedMesh(models.character, this.material.get('baseMaterial'));
        var actions = {}, mixer = this.animator.create(mesh);
        console.log(models.character);
        this.animation.get('baseAnimation', models.character.bones, mixer).then(function (animations) {
            // animations.base.idleBody.play();
            console.log(animations);
            // animations.base.idle.play();
            animations.base.idle.play();
            // animations.base.lookAround.play();
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
        // mesh.rotation.y = Math.PI
        return mesh;
    };
    return ArtDirector;
}(Character_1.Character));
exports.ArtDirector = ArtDirector;
//# sourceMappingURL=ArtDirector.js.map