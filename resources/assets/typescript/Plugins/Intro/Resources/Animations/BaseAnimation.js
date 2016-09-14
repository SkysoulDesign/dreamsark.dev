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
                base: '/animations/BaseAnimation.anim',
                base2: '/animations/BaseAnimation.anim'
            };
        },
        enumerable: true,
        configurable: true
    });
    BaseAnimation.prototype.create = function (animations) {
        console.log(animations);
        console.log('ceating animation');
        return animations;
    };
    return BaseAnimation;
}());
exports.BaseAnimation = BaseAnimation;
//# sourceMappingURL=BaseAnimation.js.map