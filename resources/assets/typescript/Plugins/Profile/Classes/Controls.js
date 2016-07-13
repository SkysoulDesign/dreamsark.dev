"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Import the TrackballControls
 */
// require('../../../../../../node_modules/three/examples/js/controls/OrbitControls');
require('../../../../../../node_modules/three/examples/js/controls/OrbitControls');
//
/**
 * Class Controls
 */
var Controls = (function (_super) {
    __extends(Controls, _super);
    /**
     * Constructor
     */
    function Controls(app) {
        _super.call(this, app.camera, app.canvas);
        /**
         * Mouse Coordinates
         * @type {{x: number, y: number}}
         */
        this.mouse = {
            x: 0,
            y: 0
        };
        this.browser = null;
        this.camera = null;
        this.scene = null;
        this.enableDamping = true;
        this.enablePan = false;
        this.enableZoom = false;
        this.enableKeys = false;
        this.minPolarAngle = Math.PI / 2; // radians
        this.maxPolarAngle = 0; // radians
        // this.noZoom = true;
        // this.noRoll = false;
        // this.noPan = true;
        // this.noRotate = true;
        // this.maxAzimuthAngle('')
        document.addEventListener('mousemove', this.move.bind(this), false);
    }
    Controls.prototype.boot = function (app) {
        this.browser = app.browser;
        this.camera = app.camera;
        this.scene = app.scene;
    };
    /**
     * On Mouse Move
     * @param event
     */
    Controls.prototype.move = function (event) {
        this.mouse.x = (event.clientX - this.browser.window.half.x) / 2;
        this.mouse.y = (event.clientY - this.browser.window.half.y) / 2;
    };
    return Controls;
}(THREE.OrbitControls));
exports.Controls = Controls;
//# sourceMappingURL=Controls.js.map