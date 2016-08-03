"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseCharacter_1 = require("./BaseCharacter");
/**
 * Character: RecordingArtist
 */
var RecordingArtist = (function (_super) {
    __extends(RecordingArtist, _super);
    function RecordingArtist() {
        _super.apply(this, arguments);
    }
    RecordingArtist.prototype.models = function () {
        return {
            character: '/models/RecordingArtist.json',
        };
    };
    return RecordingArtist;
}(BaseCharacter_1.BaseCharacter));
exports.RecordingArtist = RecordingArtist;
//# sourceMappingURL=RecordingArtist.js.map