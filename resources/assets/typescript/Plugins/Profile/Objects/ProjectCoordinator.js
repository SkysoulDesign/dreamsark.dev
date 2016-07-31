"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseCharacter_1 = require("./BaseCharacter");
/**
 * Character: ProjectCoordinator
 */
var ProjectCoordinator = (function (_super) {
    __extends(ProjectCoordinator, _super);
    function ProjectCoordinator() {
        _super.apply(this, arguments);
    }
    ProjectCoordinator.prototype.models = function () {
        return {
            character: '/models/ProjectCoordinator.json',
        };
    };
    return ProjectCoordinator;
}(BaseCharacter_1.BaseCharacter));
exports.ProjectCoordinator = ProjectCoordinator;
//# sourceMappingURL=ProjectCoordinator.js.map