"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseCharacter_1 = require("./BaseCharacter");
/**
 * Character: Base
 */
var Base = (function (_super) {
    __extends(Base, _super);
    function Base() {
        _super.apply(this, arguments);
    }
    Base.prototype.models = function () {
        return {
            character: '/models/Base.json',
        };
    };
    return Base;
}(BaseCharacter_1.BaseCharacter));
exports.Base = Base;
//# sourceMappingURL=Base.js.map