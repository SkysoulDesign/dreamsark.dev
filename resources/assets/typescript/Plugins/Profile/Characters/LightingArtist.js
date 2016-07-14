"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseCharacter_1 = require("./BaseCharacter");
/**
 * Character: LightingArtist
 */
var LightingArtist = (function (_super) {
    __extends(LightingArtist, _super);
    function LightingArtist() {
        _super.apply(this, arguments);
    }
    LightingArtist.prototype.models = function () {
        return {
            character: '/models/LightingArtist.json',
        };
    };
    return LightingArtist;
}(BaseCharacter_1.BaseCharacter));
exports.LightingArtist = LightingArtist;
//# sourceMappingURL=LightingArtist.js.map