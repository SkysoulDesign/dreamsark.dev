"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Components_1 = require("../Abstract/Components");
var Browser = (function (_super) {
    __extends(Browser, _super);
    function Browser(app) {
        _super.call(this, app);
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.aspect = this.width / this.height;
        this.pixelRatio = window.devicePixelRatio;
        this.window = {
            half: {
                x: this.width / 2,
                y: this.height / 2,
            }
        };
        window.addEventListener('resize', this.resize.bind(this), false);
    }
    Browser.prototype.boot = function (app) {
        this.camera = app.camera;
        this.renderer = app.renderer;
        this.canvas = app.canvas;
        this.width = this.canvas.offsetWidth;
        this.height = this.canvas.offsetHeight;
        this.resize();
    };
    /**
     * Set Half of the Screen
     * @param x
     * @param y
     */
    Browser.prototype.updateHalf = function (x, y) {
        if (x === void 0) { x = (this.width / 2); }
        if (y === void 0) { y = (this.height / 2); }
        this.window.half.x = x;
        this.window.half.y = y;
    };
    /**
     * On Screen Resize
     */
    Browser.prototype.resize = function () {
        this.updateHalf();
        this.width = this.canvas.offsetWidth;
        this.height = this.canvas.offsetHeight;
        this.camera.aspect = this.width / this.height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.width, this.height);
    };
    return Browser;
}(Components_1.Components));
exports.Browser = Browser;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQnJvd3Nlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkJyb3dzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsMkJBQXlCLHdCQUF3QixDQUFDLENBQUE7QUFFbEQ7SUFBNkIsMkJBQVU7SUFVbkMsaUJBQVksR0FBRztRQUNYLGtCQUFNLEdBQUcsQ0FBQyxDQUFDO1FBTlIsVUFBSyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUM7UUFDMUIsV0FBTSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUM7UUFDNUIsV0FBTSxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUNsQyxlQUFVLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFDO1FBb0JyQyxXQUFNLEdBQUc7WUFDWixJQUFJLEVBQUU7Z0JBQ0YsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQztnQkFDakIsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQzthQUNyQjtTQUNKLENBQUE7UUFyQkcsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBRU0sc0JBQUksR0FBWCxVQUFZLEdBQUc7UUFFWCxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUM7UUFDekIsSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDO1FBQzdCLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQztRQUV6QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUE7UUFFdEMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBRWxCLENBQUM7SUFTRDs7OztPQUlHO0lBQ0ssNEJBQVUsR0FBbEIsVUFBbUIsQ0FBMkIsRUFBRSxDQUE0QjtRQUF6RCxpQkFBMkIsR0FBM0IsS0FBWSxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUFFLGlCQUE0QixHQUE1QixLQUFZLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ3hFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBRUQ7O09BRUc7SUFDSyx3QkFBTSxHQUFkO1FBRUksSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBRWxCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUM7UUFDckMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQztRQUV2QyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUE7UUFDN0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRXBELENBQUM7SUFFTCxjQUFDO0FBQUQsQ0FBQyxBQTdERCxDQUE2Qix1QkFBVSxHQTZEdEM7QUE3RFksZUFBTyxVQTZEbkIsQ0FBQSJ9