"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Character_1 = require("../Abstract/Character");
var BaseCharacter = (function (_super) {
    __extends(BaseCharacter, _super);
    function BaseCharacter() {
        _super.apply(this, arguments);
    }
    BaseCharacter.prototype.create = function (models) {
        var materials = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            materials[_i - 1] = arguments[_i];
        }
        var mesh = new THREE.SkinnedMesh(models.character, this.material.get('baseMaterial'));
        var actions = {}, mixer = this.animator.create(mesh);
        this.animation.get('baseAnimation', models.character.bones, mixer).then(function (animations) {
            animations.base.idle.play();
            animations.base.lookAround.play();
        });
        /**
         * Play All Animations
         */
        if (models.character.animations)
            models.character.animations.forEach(function (animation) {
                actions[animation.name] = mixer.clipAction(animation);
                actions[animation.name].play();
            });
        mesh.position.setY(-25);
        mesh.rotation.y = Math.PI;
        //         var text = document.createElement('div');
        //         text.style.position = 'absolute';
        //         text.style.color = 'black';
        //         text.innerHTML = 'Oh hai!';
        // //
        //         text.style.left = mesh.position.x + 'px';
        //         text.style.top = mesh.position.y + 'px';
        //
        //         document.body.appendChild(text)
        return mesh;
    };
    return BaseCharacter;
}(Character_1.Character));
exports.BaseCharacter = BaseCharacter;
//# sourceMappingURL=BaseCharacter.js.map