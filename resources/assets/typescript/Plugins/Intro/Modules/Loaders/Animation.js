"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Initializable_1 = require("../../Abstracts/Initializable");
var Helpers_1 = require("../../../../Helpers");
/**
 * Animation Class
 */
var Animation = (function (_super) {
    __extends(Animation, _super);
    function Animation() {
        _super.apply(this, arguments);
        this.instances = {};
        this.mixers = [];
    }
    Object.defineProperty(Animation.prototype, "collection", {
        get: function () {
            return function () { };
        },
        enumerable: true,
        configurable: true
    });
    Animation.prototype.initialize = function (path) {
        return this.app.loader.load(path);
    };
    /**
     * Create a new Animation
     *
     * @param mesh
     */
    Animation.prototype.create = function (root, bones, animations) {
        var mixer = new THREE.AnimationMixer(root), parsed = {};
        this.mixers.push(mixer);
        var _loop_1 = function(track) {
            animations[track].forEach(function (anim) {
                parsed[Helpers_1.toCamelCase(anim.name)] = mixer.clipAction(THREE.AnimationClip.parseAnimation(anim, bones, track));
            });
        };
        for (var track in animations) {
            _loop_1(track);
        }
        return parsed;
    };
    /**
     * Update Animations
     *
     * @param time
     * @param delta
     */
    Animation.prototype.update = function (time, delta) {
        if (this.mixers.length > 0) {
            for (var i = 0; i < this.mixers.length; i++) {
                this.mixers[i].update(delta);
            }
        }
    };
    return Animation;
}(Initializable_1.Initializable));
exports.Animation = Animation;
//# sourceMappingURL=Animation.js.map