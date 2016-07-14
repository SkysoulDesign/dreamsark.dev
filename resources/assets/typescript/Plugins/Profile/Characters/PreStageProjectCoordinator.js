"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseCharacter_1 = require("./BaseCharacter");
/**
 * Character: PreStageProjectCoordinator
 */
var PreStageProjectCoordinator = (function (_super) {
    __extends(PreStageProjectCoordinator, _super);
    function PreStageProjectCoordinator() {
        _super.apply(this, arguments);
    }
    PreStageProjectCoordinator.prototype.models = function () {
        return {
            character: '/models/PreStageProjectCoordinator.json',
        };
    };
    return PreStageProjectCoordinator;
}(BaseCharacter_1.BaseCharacter));
exports.PreStageProjectCoordinator = PreStageProjectCoordinator;
//# sourceMappingURL=PreStageProjectCoordinator.js.map