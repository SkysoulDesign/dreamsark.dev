"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseCharacter_1 = require("./BaseCharacter");
/**
 * Character: CameraDirector
 */
var CameraDirector = (function (_super) {
    __extends(CameraDirector, _super);
    function CameraDirector() {
        _super.apply(this, arguments);
    }
    CameraDirector.prototype.models = function () {
        return {
            character: '/models/CameraDirector.json',
        };
    };
    return CameraDirector;
}(BaseCharacter_1.BaseCharacter));
exports.CameraDirector = CameraDirector;
//# sourceMappingURL=CameraDirector.js.map