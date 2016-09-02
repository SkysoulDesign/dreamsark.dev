"use strict";
/**
 * Character: Actress
 */
var Actress = (function () {
    function Actress() {
    }
    Object.defineProperty(Actress.prototype, "models", {
        get: function () {
            return {
                character: '/models/Actress.json',
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Actress.prototype, "materials", {
        get: function () {
            return {
                material: 'CharacterDefaultMaterial'
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Actress.prototype, "animations", {
        get: function () {
            return {
                animation: 'baseAnimation'
            };
        },
        enumerable: true,
        configurable: true
    });
    Actress.prototype.animate = function (_a) {
        var animation = _a.animation;
    };
    Actress.prototype.create = function (_a, _b) {
        var character = _a.character;
        var material = _b.material;
        return new THREE.SkinnedMesh(character, material);
        // console.log(animation)
        // this.animator.create(character, animation);
        // let actions = {},
        //     mixer = this.animator.create(mesh);
        //
        // this.animation.get('baseAnimation', models.character.bones, mixer).then(animations => {
        //     animations.base.idle.play();
        //     animations.base.lookAround.play();
        // })
        //
        // /**
        //  * Play All Animations
        //  */
        // if (models.character.animations)
        //     models.character.animations.forEach(function (animation) {
        //         actions[animation.name] = mixer.clipAction(animation);
        //         actions[animation.name].play();
        //     })
        return mesh;
    };
    return Actress;
}());
exports.Actress = Actress;
//# sourceMappingURL=Actress.js.map