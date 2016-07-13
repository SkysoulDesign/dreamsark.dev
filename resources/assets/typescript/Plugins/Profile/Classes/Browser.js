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
//# sourceMappingURL=Browser.js.map