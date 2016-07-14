"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseCharacter_1 = require("./BaseCharacter");
/**
 * Character: VoiceArtist
 */
var VoiceArtist = (function (_super) {
    __extends(VoiceArtist, _super);
    function VoiceArtist() {
        _super.apply(this, arguments);
    }
    VoiceArtist.prototype.models = function () {
        return {
            character: '/models/VoiceArtist.json',
        };
    };
    return VoiceArtist;
}(BaseCharacter_1.BaseCharacter));
exports.VoiceArtist = VoiceArtist;
//# sourceMappingURL=VoiceArtist.js.map