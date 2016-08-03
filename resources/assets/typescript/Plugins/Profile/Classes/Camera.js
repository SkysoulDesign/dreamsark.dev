"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Camera Class
 */
var Camera = (function (_super) {
    __extends(Camera, _super);
    function Camera() {
        _super.apply(this, arguments);
    }
    Camera.prototype.boot = function (app) {
        this.fov = 20;
        this.aspect = app.browser.aspect;
        this.near = 1;
        this.far = 2000;
        this.position.z = -180;
        this.updateProjectionMatrix();
    };
    return Camera;
}(THREE.PerspectiveCamera));
exports.Camera = Camera;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FtZXJhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQ2FtZXJhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUVBOztHQUVHO0FBQ0g7SUFBNEIsMEJBQXVCO0lBQW5EO1FBQTRCLDhCQUF1QjtJQWNuRCxDQUFDO0lBWkcscUJBQUksR0FBSixVQUFLLEdBQUc7UUFFSixJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUNkLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7UUFDakMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUM7UUFDZCxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQztRQUNoQixJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQztRQUV2QixJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztJQUVsQyxDQUFDO0lBRUwsYUFBQztBQUFELENBQUMsQUFkRCxDQUE0QixLQUFLLENBQUMsaUJBQWlCLEdBY2xEO0FBZFksY0FBTSxTQWNsQixDQUFBIn0=