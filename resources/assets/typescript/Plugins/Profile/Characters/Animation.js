"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseCharacter_1 = require("./BaseCharacter");
/**
 * Character: Animation
 */
var Animation = (function (_super) {
    __extends(Animation, _super);
    function Animation() {
        _super.apply(this, arguments);
    }
    Animation.prototype.models = function () {
        return {
            character: '/models/Animation.json',
        };
    };
    return Animation;
}(BaseCharacter_1.BaseCharacter));
exports.Animation = Animation;
//# sourceMappingURL=Animation.js.map