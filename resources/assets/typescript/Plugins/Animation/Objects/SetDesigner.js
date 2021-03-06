"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseCharacter_1 = require("./BaseCharacter");
/**
 * Character: SetDesigner
 */
var SetDesigner = (function (_super) {
    __extends(SetDesigner, _super);
    function SetDesigner() {
        _super.apply(this, arguments);
    }
    SetDesigner.prototype.models = function () {
        return {
            character: '/models/SetDesigner.json',
        };
    };
    return SetDesigner;
}(BaseCharacter_1.BaseCharacter));
exports.SetDesigner = SetDesigner;
//# sourceMappingURL=SetDesigner.js.map