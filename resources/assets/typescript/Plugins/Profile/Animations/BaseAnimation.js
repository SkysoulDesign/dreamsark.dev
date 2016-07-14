"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AbstractAnimation_1 = require("../Abstract/AbstractAnimation");
/**
 * BaseAnimation Class
 */
var BaseAnimation = (function (_super) {
    __extends(BaseAnimation, _super);
    function BaseAnimation() {
        _super.apply(this, arguments);
    }
    BaseAnimation.prototype.animations = function () {
        return {
            base: '/animations/BaseAnimation.anim'
        };
    };
    BaseAnimation.prototype.configure = function (animations) {
        return animations;
    };
    return BaseAnimation;
}(AbstractAnimation_1.AbstractAnimation));
exports.BaseAnimation = BaseAnimation;
//# sourceMappingURL=BaseAnimation.js.map