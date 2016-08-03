"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseCharacter_1 = require("./BaseCharacter");
/**
 * Character: Prop
 */
var Prop = (function (_super) {
    __extends(Prop, _super);
    function Prop() {
        _super.apply(this, arguments);
    }
    Prop.prototype.models = function () {
        return {
            character: '/models/Prop.json',
        };
    };
    return Prop;
}(BaseCharacter_1.BaseCharacter));
exports.Prop = Prop;
//# sourceMappingURL=Prop.js.map