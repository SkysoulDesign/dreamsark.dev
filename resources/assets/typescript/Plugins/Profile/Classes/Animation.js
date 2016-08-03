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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQW5pbWF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQW5pbWF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDJCQUF5Qix3QkFBd0IsQ0FBQyxDQUFBO0FBQ2xELHdCQUF3QixlQUFlLENBQUMsQ0FBQTtBQUN4Qyx3QkFBMEIsa0JBQWtCLENBQUMsQ0FBQTtBQUU3Qzs7R0FFRztBQUNIO0lBQStCLDZCQUFVO0lBQXpDO1FBQStCLDhCQUFVO1FBRXJDOztXQUVHO1FBQ0ssZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFHakIsZUFBVSxHQUFHO1lBQ2pCLGFBQWEsRUFBRSxPQUFPLENBQUMsNkJBQTZCLENBQUM7U0FDeEQsQ0FBQTtJQXVFTCxDQUFDO0lBckVHLHdCQUFJLEdBQUosVUFBSyxHQUFHO1FBQ0osSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDO0lBQzdCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsdUJBQUcsR0FBSCxVQUFJLElBQVcsRUFBRSxLQUFXLEVBQUUsS0FBSztRQUUvQixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3RDLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyx1Q0FBcUMsSUFBTSxDQUFDLENBQUM7UUFFekYsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdEMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFbEMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBRWhFLENBQUM7SUFFTyx3QkFBSSxHQUFaLFVBQWEsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsS0FBSztRQUF2QyxpQkE4Q0M7UUE1Q0csTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLFVBQUMsTUFBTSxFQUFFLE1BQU07WUFFOUIsSUFBSSxTQUFTLENBQUM7WUFFZDtnQkFFSSxJQUFJLFFBQVEsR0FBRyxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDN0IsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBRXhCLFNBQVMsR0FBRyxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBRWxDLElBQUksTUFBTSxHQUFHLEVBQUUsRUFDWCxPQUFPLEdBQUcsQ0FBQyxFQUNYLEdBQUcsR0FBRyxtQkFBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUUvQjtvQkFFSSxLQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBSSxDQUFDLEVBQUUsVUFBQSxLQUFLO3dCQUVuQyxTQUFTLENBQUMsTUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDO3dCQUN4QixNQUFNLENBQUMsTUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFBO3dCQUdqQixLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsSUFBSTs0QkFDeEIsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FDdkIsS0FBSyxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUNsRCxDQUFDOzRCQUVGLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQTs0QkFFMUIsTUFBTSxDQUFDLE1BQUksQ0FBQyxDQUFDLHFCQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO3dCQUNoRCxDQUFDLENBQUMsQ0FBQTt3QkFFRixFQUFFLENBQUMsQ0FBQyxPQUFPLEtBQUssR0FBRyxDQUFDOzRCQUNoQixNQUFNLENBQUMsRUFBRSxPQUFPLENBQUM7d0JBRXJCLE1BQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUE7b0JBRXRDLENBQUMsQ0FBQyxDQUFBOztnQkF2Qk4sR0FBRyxDQUFDLENBQUMsSUFBSSxNQUFJLElBQUksU0FBUyxDQUFDOztpQkF5QjFCOztZQXBDTCxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxNQUFNLENBQUM7O2FBcUNwQjtRQUNMLENBQUMsQ0FBQyxDQUFBO0lBRU4sQ0FBQztJQUVMLGdCQUFDO0FBQUQsQ0FBQyxBQWpGRCxDQUErQix1QkFBVSxHQWlGeEM7QUFqRlksaUJBQVMsWUFpRnJCLENBQUEifQ==