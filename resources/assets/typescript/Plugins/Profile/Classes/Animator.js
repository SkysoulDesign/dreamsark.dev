"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Components_1 = require("../Abstract/Components");
/**
 * Animator Class
 */
var Animator = (function (_super) {
    __extends(Animator, _super);
    function Animator() {
        _super.call(this);
        this.animations = [];
    }
    /**
     * Create a new Animation
     *
     * @param mesh
     * @returns {THREE.AnimationMixer}
     */
    Animator.prototype.create = function (mesh) {
        var mixer = new THREE.AnimationMixer(mesh);
        this.animations.push(mixer);
        return mixer;
    };
    Animator.prototype.push = function (name, mixer) {
        this.animations.push({
            name: name,
            mixer: mixer
        });
    };
    /**
     * Update Animations
     * @param time
     * @param delta
     */
    Animator.prototype.update = function (time, delta) {
        if (this.animations.length > 0) {
            for (var i = 0; i < this.animations.length; i++) {
                this.animations[i].update(delta);
            }
        }
    };
    return Animator;
}(Components_1.Components));
exports.Animator = Animator;
//# sourceMappingURL=Animator.js.map