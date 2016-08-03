"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Components_1 = require("../Abstract/Components");
var Helpers_1 = require("../../Helpers");
var Helpers_2 = require("../../../Helpers");
/**
 * Material Class
 */
var Animation = (function (_super) {
    __extends(Animation, _super);
    function Animation() {
        _super.apply(this, arguments);
        /**
         * List of Initialized Materials
         */
        this.initialized = {};
        this.animations = {
            baseAnimation: require('../Animations/BaseAnimation')
        };
    }
    Animation.prototype.boot = function (app) {
        this.loader = app.loader;
    };
    /**
     * Get Material
     * @param name
     * @returns {any}
     */
    Animation.prototype.get = function (name, bones, mixer) {
        if (!this.animations.hasOwnProperty(name))
            return window['dreamsark'].logger.error("No animation found with the name: " + name);
        if (this.initialized.hasOwnProperty(name))
            return this.initialized[name];
        return this.load(name, this.animations[name], bones, mixer);
    };
    Animation.prototype.load = function (name, object, bones, mixer) {
        var _this = this;
        return new Promise(function (accept, reject) {
            var animation;
            var _loop_1 = function(i) {
                var instance = new object[i];
                instance.boot(_this.app);
                animation = instance.animations();
                var parsed = {}, counter = 1, max = Helpers_1.countKeys(animation);
                var _loop_2 = function(name_1) {
                    _this.loader.load(animation[name_1], function (anims) {
                        animation[name_1] = anims;
                        parsed[name_1] = {};
                        anims.forEach(function (anim) {
                            var clip = mixer.clipAction(THREE.AnimationClip.parseAnimation(anim, bones));
                            clip.setEffectiveWeight(1);
                            parsed[name_1][Helpers_2.toCamelCase(anim.name)] = clip;
                        });
                        if (counter !== max)
                            return ++counter;
                        accept(instance.configure(parsed));
                    });
                };
                for (var name_1 in animation) {
                    _loop_2(name_1);
                }
            };
            for (var i in object) {
                _loop_1(i);
            }
        });
    };
    return Animation;
}(Components_1.Components));
exports.Animation = Animation;
//# sourceMappingURL=Animation.js.map