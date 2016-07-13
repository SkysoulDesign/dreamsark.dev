"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AbstractComposition_1 = require("../Abstract/AbstractComposition");
/**
 * Project Class
 */
var Project = (function (_super) {
    __extends(Project, _super);
    function Project() {
        _super.apply(this, arguments);
        this.chars = [];
    }
    Project.prototype.setup = function (app) {
        var payload = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            payload[_i - 1] = arguments[_i];
        }
        this.chars = payload;
        app.controls.enabled = false;
    };
    Project.prototype.characters = function () {
        console.log(this.chars);
        return [
            'editor',
            'director',
            'actor',
            'screen-writer',
            'art-director',
            'animation',
        ];
    };
    Project.prototype.stage = function (scene, camera, characters) {
        var position = 0;
        for (var i in characters) {
            characters[i].position.setX(position);
            position += 50;
            scene.add(characters[i]);
        }
    };
    Project.prototype.update = function (scene, camera, characters, time, delta) {
    };
    return Project;
}(AbstractComposition_1.AbstractComposition));
exports.Project = Project;
//# sourceMappingURL=Project.js.map