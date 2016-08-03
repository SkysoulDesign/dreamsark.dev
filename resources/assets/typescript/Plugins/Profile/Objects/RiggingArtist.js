"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseCharacter_1 = require("./BaseCharacter");
/**
 * Character: RiggingArtist
 */
var RiggingArtist = (function (_super) {
    __extends(RiggingArtist, _super);
    function RiggingArtist() {
        _super.apply(this, arguments);
    }
    RiggingArtist.prototype.models = function () {
        return {
            character: '/models/RiggingArtist.json',
        };
    };
    return RiggingArtist;
}(BaseCharacter_1.BaseCharacter));
exports.RiggingArtist = RiggingArtist;
//# sourceMappingURL=RiggingArtist.js.map