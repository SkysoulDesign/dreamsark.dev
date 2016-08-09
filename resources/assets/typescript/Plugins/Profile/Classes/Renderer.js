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
    function Renderer(app) {
        _super.call(this, {
            antialias: true,
            alpha: true,
        });
        app.canvas.appendChild(this.domElement);
    }
    Renderer.prototype.boot = function (app) {
        this.scene = app.scene;
        this.camera = app.camera;
        this.browser = app.browser;
        this.setSize(app.canvas.offsetWidth, app.canvas.offsetHeight);
        this.setPixelRatio(this.browser.pixelRatio);
    };
    Renderer.prototype.update = function (time, delta) {
        this.render(this.scene, this.camera);
    };
    return Renderer;
}(THREE.WebGLRenderer));
exports.Renderer = Renderer;
//# sourceMappingURL=Renderer.js.map