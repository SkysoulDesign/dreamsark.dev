"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseCharacter_1 = require("./BaseCharacter");
/**
 * Character: SoundEffect
 */
var SoundEffect = (function (_super) {
    __extends(SoundEffect, _super);
    function SoundEffect() {
        _super.apply(this, arguments);
    }
    SoundEffect.prototype.models = function () {
        return {
            character: '/models/SoundEffect.json',
        };
    };
    return SoundEffect;
}(BaseCharacter_1.BaseCharacter));
exports.SoundEffect = SoundEffect;
//# sourceMappingURL=SoundEffect.js.map