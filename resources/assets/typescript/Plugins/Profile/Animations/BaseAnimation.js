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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZUFuaW1hdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkJhc2VBbmltYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0Esa0NBQWdDLCtCQUErQixDQUFDLENBQUE7QUFFaEU7O0dBRUc7QUFDSDtJQUFtQyxpQ0FBaUI7SUFBcEQ7UUFBbUMsOEJBQWlCO0lBWXBELENBQUM7SUFWRyxrQ0FBVSxHQUFWO1FBQ0ksTUFBTSxDQUFDO1lBQ0gsSUFBSSxFQUFFLGdDQUFnQztTQUN6QyxDQUFBO0lBQ0wsQ0FBQztJQUVELGlDQUFTLEdBQVQsVUFBVSxVQUFVO1FBQ2hCLE1BQU0sQ0FBQyxVQUFVLENBQUM7SUFDdEIsQ0FBQztJQUVMLG9CQUFDO0FBQUQsQ0FBQyxBQVpELENBQW1DLHFDQUFpQixHQVluRDtBQVpZLHFCQUFhLGdCQVl6QixDQUFBIn0=