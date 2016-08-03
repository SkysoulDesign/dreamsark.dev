"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseCharacter_1 = require("./BaseCharacter");
/**
 * Character: Effects
 */
var Effects = (function (_super) {
    __extends(Effects, _super);
    function Effects() {
        _super.apply(this, arguments);
    }
    Effects.prototype.models = function () {
        return {
            character: '/models/Effects.json',
        };
    };
    return Effects;
}(BaseCharacter_1.BaseCharacter));
exports.Effects = Effects;
//# sourceMappingURL=Effects.js.map