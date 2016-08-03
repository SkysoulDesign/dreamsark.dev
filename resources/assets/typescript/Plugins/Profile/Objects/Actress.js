"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseCharacter_1 = require("./BaseCharacter");
/**
 * Character: Actress
 */
var Actress = (function (_super) {
    __extends(Actress, _super);
    function Actress() {
        _super.apply(this, arguments);
    }
    Actress.prototype.models = function () {
        return {
            character: '/models/Actress.json',
        };
    };
    return Actress;
}(BaseCharacter_1.BaseCharacter));
exports.Actress = Actress;
//# sourceMappingURL=Actress.js.map