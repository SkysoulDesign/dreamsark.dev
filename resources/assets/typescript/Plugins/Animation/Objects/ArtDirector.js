"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseCharacter_1 = require("./BaseCharacter");
/**
 * Character: ArtDirector
 */
var ArtDirector = (function (_super) {
    __extends(ArtDirector, _super);
    function ArtDirector() {
        _super.apply(this, arguments);
    }
    ArtDirector.prototype.models = function () {
        return {
            character: '/models/ArtDirector.json',
        };
    };
    return ArtDirector;
}(BaseCharacter_1.BaseCharacter));
exports.ArtDirector = ArtDirector;
//# sourceMappingURL=ArtDirector.js.map