"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseCharacter_1 = require("./BaseCharacter");
/**
 * Character: StageManager
 */
var StageManager = (function (_super) {
    __extends(StageManager, _super);
    function StageManager() {
        _super.apply(this, arguments);
    }
    StageManager.prototype.models = function () {
        return {
            character: '/models/StageManager.json',
        };
    };
    return StageManager;
}(BaseCharacter_1.BaseCharacter));
exports.StageManager = StageManager;
//# sourceMappingURL=StageManager.js.map