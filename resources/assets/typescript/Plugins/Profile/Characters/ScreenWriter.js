"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Character_1 = require("../Abstract/Character");
/**
 * Character: ScreenWriter
 */
var ScreenWriter = (function (_super) {
    __extends(ScreenWriter, _super);
    function ScreenWriter() {
        _super.apply(this, arguments);
        this.defer = true;
    }
    ScreenWriter.prototype.models = function () {
        return {
            character: '/models/ScreenWriter.json',
        };
    };
    ScreenWriter.prototype.create = function (models) {
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
        // action.run   = mixer.clipAction( models.miku.animations[ 1 ] );
        // action.jump  = mixer.clipAction( models.miku.animations[ 2 ] );
        // action.slide = mixer.clipAction( models.miku.animations[ 3 ] );
        action.idle.setEffectiveWeight(1);
        // action.run.setEffectiveWeight( 1 );
        // action.jump.setEffectiveWeight( 1 );
        // action.slide.setEffectiveWeight( 1 );
        // action.jump.setLoop( THREE.LoopOnce, 0 );
        // action.slide.setLoop( THREE.LoopOnce, 0 );
        // action.jump.clampWhenFinished = true;
        // action.slide.clampWhenFinished = true;
        action.idle.play();
        // action.idle.setEffectiveWeight(1);
        //http://yomotsu.net/blog/2015/10/31/three-r73-anim.html
        // action.jump.setLoop(THREE.LoopOnce, 0);
        // action.slide.setLoop(THREE.LoopOnce, 0);
        // action.jump.clampWhenFinished = true;
        // action.slide.clampWhenFinished = true;
        // let mesh = new THREE.SkinnedMesh(object, material);
        // console.log(mesh.animations)
        // let animation = new THREE.Animation(model, model.animations);
        mesh.position.setY(-25);
        // mesh.position.setZ(-50)
        mesh.rotation.y = Math.PI;
        return mesh;
    };
    ScreenWriter.prototype.material = function () {
        return new THREE.MeshBasicMaterial({
            color: 0xff0000, wireframe: true
        });
    };
    return ScreenWriter;
}(Character_1.Character));
exports.ScreenWriter = ScreenWriter;
//# sourceMappingURL=ScreenWriter.js.map