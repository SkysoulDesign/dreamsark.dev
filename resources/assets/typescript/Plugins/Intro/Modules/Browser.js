"use strict";
/**
 * Browser Class
 */
var Browser = (function () {
    function Browser(app) {
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
    Browser.prototype.boot = function (_a) {
        var camera = _a.camera, renderer = _a.renderer, canvas = _a.canvas;
        this.camera = camera;
        this.renderer = renderer;
        this.canvas = canvas;
        this.width = canvas.offsetWidth;
        this.height = canvas.offsetHeight;
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
    Browser.prototype.update = function (time, delta) {
    };
    return Browser;
}());
exports.Browser = Browser;
//# sourceMappingURL=Browser.js.map