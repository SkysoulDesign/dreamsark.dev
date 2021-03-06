"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseCharacter_1 = require("./BaseCharacter");
/**
 * Character: StoryboardArtist
 */
var StoryboardArtist = (function (_super) {
    __extends(StoryboardArtist, _super);
    function StoryboardArtist() {
        _super.apply(this, arguments);
    }
    StoryboardArtist.prototype.models = function () {
        return {
            character: '/models/StoryboardArtist.json',
        };
    };
    return StoryboardArtist;
}(BaseCharacter_1.BaseCharacter));
exports.StoryboardArtist = StoryboardArtist;
//# sourceMappingURL=StoryboardArtist.js.map