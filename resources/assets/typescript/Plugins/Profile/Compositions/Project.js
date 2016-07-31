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
        // app.controls.enabled = false
        app.controls.enableZoom = true;
        app.controls.enablePan = true;
    };
    Project.prototype.objects = function () {
        return [
            // '*',
            'artist3D',
            'actor',
            'actress',
            'animation',
            'art-director',
            'camera-director',
            'concept-artist',
            'costume-designer',
            'director',
            'editor',
            'effects',
            'executive-producer',
            'lighting-artist',
            'make-up-artist',
            'packaging-designer',
            'pre-stage-project-coordinator',
            'project-coordinator',
            'prop',
            'recording-artist',
            'render-and-composite',
            'rigging-artist',
            'screenwriter',
            'script-supervisor',
            'set-designer',
            'sound-effect',
            'stage-manager',
            'storyboard-artist',
            'swing-gang',
            'voice-artist',
        ];
    };
    Project.prototype.stage = function (scene, camera, objects) {
        var position = 0;
        for (var i in objects) {
            objects[i].position.setX(position);
            position += 50;
            scene.add(objects[i]);
        }
    };
    Project.prototype.update = function (scene, camera, objects, time, delta) {
    };
    return Project;
}(AbstractComposition_1.AbstractComposition));
exports.Project = Project;
//# sourceMappingURL=Project.js.map