"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseCharacter_1 = require("./BaseCharacter");
/**
 * Character: ScriptSupervisor
 */
var ScriptSupervisor = (function (_super) {
    __extends(ScriptSupervisor, _super);
    function ScriptSupervisor() {
        _super.apply(this, arguments);
    }
    ScriptSupervisor.prototype.models = function () {
        return {
            character: '/models/ScriptSupervisor.json',
        };
    };
    return ScriptSupervisor;
}(BaseCharacter_1.BaseCharacter));
exports.ScriptSupervisor = ScriptSupervisor;
//# sourceMappingURL=ScriptSupervisor.js.map