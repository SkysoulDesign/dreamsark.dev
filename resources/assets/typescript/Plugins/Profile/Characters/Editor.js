"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Character_1 = require("../Abstract/Character");
/**
 * Character: Editor
 */
var Editor = (function (_super) {
    __extends(Editor, _super);
    function Editor() {
        _super.apply(this, arguments);
        this.defer = true;
    }
    Editor.prototype.models = function () {
        return {
            character: '/models/Editor.json',
        };
    };
    // textures() {
    //     return {
    //         base: '/models/texture.png'
    //     }
    // }
    Editor.prototype.create = function (models, textures) {
        var materials = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            materials[_i - 2] = arguments[_i];
        }
        var mesh = new THREE.SkinnedMesh(models.character, this.material.get('baseMaterial'));
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
    return Editor;
}(Character_1.Character));
exports.Editor = Editor;
//# sourceMappingURL=Editor.js.map