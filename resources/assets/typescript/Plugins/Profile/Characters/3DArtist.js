"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseCharacter_1 = require("./BaseCharacter");
/**
 * Character: THREEDArtist
 */
var THREEDArtist = (function (_super) {
    __extends(THREEDArtist, _super);
    function THREEDArtist() {
        _super.apply(this, arguments);
    }
    THREEDArtist.prototype.models = function () {
        return {
            character: '/models/3DArtist.json',
        };
    };
    return THREEDArtist;
}(BaseCharacter_1.BaseCharacter));
exports.THREEDArtist = THREEDArtist;
//# sourceMappingURL=3DArtist.js.map