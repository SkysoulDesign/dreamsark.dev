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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udHJvbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJDb250cm9scy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFFQTs7R0FFRztBQUNILHNGQUFzRjtBQUN0RixPQUFPLENBQUMseUVBQXlFLENBQUMsQ0FBQztBQUNuRixFQUFFO0FBRUY7O0dBRUc7QUFDSDtJQUE4Qiw0QkFBbUI7SUFlN0M7O09BRUc7SUFDSCxrQkFBWSxHQUFHO1FBRVgsa0JBQU0sR0FBRyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7UUFsQmxDOzs7V0FHRztRQUNJLFVBQUssR0FBRztZQUNYLENBQUMsRUFBRSxDQUFDO1lBQ0osQ0FBQyxFQUFFLENBQUM7U0FDUCxDQUFBO1FBRU0sWUFBTyxHQUFHLElBQUksQ0FBQztRQUNmLFdBQU0sR0FBRyxJQUFJLENBQUM7UUFDZCxVQUFLLEdBQUcsSUFBSSxDQUFDO1FBU2hCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1FBQzFCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBRXhCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxVQUFVO1FBQzVDLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDLENBQUMsVUFBVTtRQUVsQyxzQkFBc0I7UUFDdEIsdUJBQXVCO1FBQ3ZCLHFCQUFxQjtRQUNyQix3QkFBd0I7UUFDeEIsMkJBQTJCO1FBRTNCLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDeEUsQ0FBQztJQUVELHVCQUFJLEdBQUosVUFBSyxHQUFHO1FBQ0osSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDO1FBQzNCLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQztRQUN6QixJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUM7SUFDM0IsQ0FBQztJQUVEOzs7T0FHRztJQUNLLHVCQUFJLEdBQVosVUFBYSxLQUFnQjtRQUV6QixJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFFLEtBQUssQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBRSxHQUFHLENBQUMsQ0FBQztRQUNsRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFFLEtBQUssQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBRSxHQUFHLENBQUMsQ0FBQztJQUV0RSxDQUFDO0lBVUwsZUFBQztBQUFELENBQUMsQUFoRUQsQ0FBOEIsS0FBSyxDQUFDLGFBQWEsR0FnRWhEO0FBaEVZLGdCQUFRLFdBZ0VwQixDQUFBIn0=