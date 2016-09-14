"use strict";
var BaseCharacter = (function () {
    function BaseCharacter(_a) {
        var animator = _a.animator;
        this.animator = animator;
    }
    ;
    Object.defineProperty(BaseCharacter.prototype, "materials", {
        get: function () {
            return {
                material: 'CharacterDefaultMaterial'
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseCharacter.prototype, "animations", {
        get: function () {
            return {
                animation: '/animations/BaseAnimation.anim'
            };
        },
        enumerable: true,
        configurable: true
    });
    BaseCharacter.prototype.configAnimation = function () { };
    BaseCharacter.prototype.create = function (_a, _b, _c) {
        var character = _a.character;
        var material = _b.material;
        var animation = _c.animation;
        var mesh = new THREE.SkinnedMesh(character, material);
        return mesh;
    };
    return BaseCharacter;
}());
exports.BaseCharacter = BaseCharacter;
//# sourceMappingURL=BaseCharacter.js.map