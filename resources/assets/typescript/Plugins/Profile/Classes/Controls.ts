import {BootableInterface} from "../../../Interfaces/BootableInterface";

/**
 * Import the TrackballControls
 */
// require('../../../../../../node_modules/three/examples/js/controls/OrbitControls');
require('../../../../../../node_modules/three/examples/js/controls/OrbitControls');
//

/**
 * Class Controls
 */
export class Controls extends THREE.OrbitControls implements BootableInterface {

    /**
     * Mouse Coordinates
     * @type {{x: number, y: number}}
     */
    public mouse = {
        x: 0,
        y: 0
    }

    public browser = null;
    public camera = null;
    public scene = null;

    /**
     * Constructor
     */
    constructor(app) {

        super(app.camera, app.canvas);

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

    boot(app) {
        this.browser = app.browser;
        this.camera = app.camera;
        this.scene = app.scene;
    }

    /**
     * On Mouse Move
     * @param event
     */
    private move(event:MouseEvent) {

        this.mouse.x = ( event.clientX - this.browser.window.half.x ) / 2;
        this.mouse.y = ( event.clientY - this.browser.window.half.y ) / 2;

    }

    // public update(time, delta) {
    //
    //     this.camera.position.x += ( -this.mouse.x - this.camera.position.x ) * .05;
    //     this.camera.position.y += ( this.mouse.y  - this.camera.position.y ) * .05;
    //     this.camera.lookAt(new THREE.Vector3(0, -10, 0))
    //
    // }

}
