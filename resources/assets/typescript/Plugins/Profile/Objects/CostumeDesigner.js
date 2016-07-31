"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseCharacter_1 = require("./BaseCharacter");
/**
 * Character: CostumeDesigner
 */
var CostumeDesigner = (function (_super) {
    __extends(CostumeDesigner, _super);
    function CostumeDesigner() {
        _super.apply(this, arguments);
    }
    CostumeDesigner.prototype.models = function () {
        return {
            character: '/models/CostumeDesigner.json',
        };
    };
    return CostumeDesigner;
}(BaseCharacter_1.BaseCharacter));
exports.CostumeDesigner = CostumeDesigner;
//# sourceMappingURL=CostumeDesigner.js.map