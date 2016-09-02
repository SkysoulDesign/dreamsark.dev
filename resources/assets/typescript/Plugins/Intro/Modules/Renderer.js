"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Class Renderer
 */
var Renderer = (function (_super) {
    __extends(Renderer, _super);
    function Renderer(_a) {
        var canvas = _a.canvas;
        _super.call(this, {
            antialias: true,
            alpha: true,
        });
        canvas.appendChild(this.domElement);
    }
    Renderer.prototype.boot = function (_a) {
        var scene = _a.scene, camera = _a.camera, browser = _a.browser, canvas = _a.canvas;
        this.scene = scene;
        this.camera = camera;
        this.browser = browser;
        this.setSize(canvas.offsetWidth, canvas.offsetHeight);
        this.setPixelRatio(this.browser.pixelRatio);
    };
    Renderer.prototype.update = function (time, delta) {
        this.render(this.scene, this.camera);
    };
    return Renderer;
}(THREE.WebGLRenderer));
exports.Renderer = Renderer;
//# sourceMappingURL=Renderer.js.map