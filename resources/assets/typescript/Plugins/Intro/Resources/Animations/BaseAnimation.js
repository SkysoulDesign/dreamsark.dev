"use strict";
/**
 * BaseAnimation Class
 */
var BaseAnimation = (function () {
    function BaseAnimation() {
    }
    Object.defineProperty(BaseAnimation.prototype, "animations", {
        get: function () {
            return {
                base: '/animations/BaseAnimation.anim'
            };
        },
        enumerable: true,
        configurable: true
    });
    BaseAnimation.prototype.create = function (animations) {
        console.log(animations);
        return animations;
    };
    return BaseAnimation;
}());
exports.BaseAnimation = BaseAnimation;
//# sourceMappingURL=BaseAnimation.js.map