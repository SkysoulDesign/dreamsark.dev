"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseCharacter_1 = require("./BaseCharacter");
/**
 * Character: Screenwriter
 */
var Screenwriter = (function (_super) {
    __extends(Screenwriter, _super);
    function Screenwriter() {
        _super.apply(this, arguments);
    }
    Screenwriter.prototype.models = function () {
        return {
            character: '/models/Screenwriter.json',
        };
    };
    return Screenwriter;
}(BaseCharacter_1.BaseCharacter));
exports.Screenwriter = Screenwriter;
//# sourceMappingURL=Screenwriter.js.map