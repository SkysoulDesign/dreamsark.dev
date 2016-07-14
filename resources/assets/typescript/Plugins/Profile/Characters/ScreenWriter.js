"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseCharacter_1 = require("./BaseCharacter");
/**
 * Character: ScreenWriter
 */
var ScreenWriter = (function (_super) {
    __extends(ScreenWriter, _super);
    function ScreenWriter() {
        _super.apply(this, arguments);
    }
    ScreenWriter.prototype.models = function () {
        return {
            character: '/models/ScreenWriter.json',
        };
    };
    return ScreenWriter;
}(BaseCharacter_1.BaseCharacter));
exports.ScreenWriter = ScreenWriter;
//# sourceMappingURL=ScreenWriter.js.map