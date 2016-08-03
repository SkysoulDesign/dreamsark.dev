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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2NyaXB0U3VwZXJ2aXNvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNjcmlwdFN1cGVydmlzb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsOEJBQTRCLGlCQUFpQixDQUFDLENBQUE7QUFFOUM7O0dBRUc7QUFDSDtJQUFzQyxvQ0FBYTtJQUFuRDtRQUFzQyw4QkFBYTtJQVFuRCxDQUFDO0lBTkcsaUNBQU0sR0FBTjtRQUNJLE1BQU0sQ0FBQztZQUNILFNBQVMsRUFBRSwrQkFBK0I7U0FDN0MsQ0FBQTtJQUNMLENBQUM7SUFFTCx1QkFBQztBQUFELENBQUMsQUFSRCxDQUFzQyw2QkFBYSxHQVFsRDtBQVJZLHdCQUFnQixtQkFRNUIsQ0FBQSJ9