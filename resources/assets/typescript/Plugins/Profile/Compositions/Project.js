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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvamVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlByb2plY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsb0NBQWtDLGlDQUFpQyxDQUFDLENBQUE7QUFFcEU7O0dBRUc7QUFDSDtJQUE2QiwyQkFBbUI7SUFBaEQ7UUFBNkIsOEJBQW1CO1FBRXBDLFVBQUssR0FBRyxFQUFFLENBQUM7SUFrRXZCLENBQUM7SUFoRUcsdUJBQUssR0FBTCxVQUFNLEdBQUc7UUFBRSxpQkFBVTthQUFWLFdBQVUsQ0FBVixzQkFBVSxDQUFWLElBQVU7WUFBVixnQ0FBVTs7UUFDakIsSUFBSSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUM7UUFDckIsK0JBQStCO1FBQy9CLEdBQUcsQ0FBQyxRQUFRLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQTtRQUM5QixHQUFHLENBQUMsUUFBUSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUE7SUFDakMsQ0FBQztJQUVELHlCQUFPLEdBQVA7UUFDSSxNQUFNLENBQUM7WUFDSCxPQUFPO1lBQ1AsVUFBVTtZQUNWLE9BQU87WUFDUCxTQUFTO1lBQ1QsV0FBVztZQUNYLGNBQWM7WUFDZCxpQkFBaUI7WUFDakIsZ0JBQWdCO1lBQ2hCLGtCQUFrQjtZQUNsQixVQUFVO1lBQ1YsUUFBUTtZQUNSLFNBQVM7WUFDVCxvQkFBb0I7WUFDcEIsaUJBQWlCO1lBQ2pCLGdCQUFnQjtZQUNoQixvQkFBb0I7WUFDcEIsK0JBQStCO1lBQy9CLHFCQUFxQjtZQUNyQixNQUFNO1lBQ04sa0JBQWtCO1lBQ2xCLHNCQUFzQjtZQUN0QixnQkFBZ0I7WUFDaEIsY0FBYztZQUNkLG1CQUFtQjtZQUNuQixjQUFjO1lBQ2QsY0FBYztZQUNkLGVBQWU7WUFDZixtQkFBbUI7WUFDbkIsWUFBWTtZQUNaLGNBQWM7U0FDakIsQ0FBQztJQUNOLENBQUM7SUFFRCx1QkFBSyxHQUFMLFVBQU0sS0FBSyxFQUFFLE1BQU0sRUFBRSxPQUFPO1FBRXhCLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQztRQUVqQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBRXBCLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUNwQixRQUFRLENBQ1gsQ0FBQTtZQUVELFFBQVEsSUFBSSxFQUFFLENBQUE7WUFFZCxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBRXpCLENBQUM7SUFFTCxDQUFDO0lBRUQsd0JBQU0sR0FBTixVQUFPLEtBQUssRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxLQUFLO0lBRTFDLENBQUM7SUFFTCxjQUFDO0FBQUQsQ0FBQyxBQXBFRCxDQUE2Qix5Q0FBbUIsR0FvRS9DO0FBcEVZLGVBQU8sVUFvRW5CLENBQUEifQ==