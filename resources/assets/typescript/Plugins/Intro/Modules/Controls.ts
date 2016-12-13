import { BootableInterface } from "../../../Interfaces/BootableInterface";
import { ModulesInterface } from "../Interfaces/ModulesInterface";
import { deg2rad } from "../Helpers";

require('../../../../../../node_modules/three/examples/js/controls/TrackballControls');
// require('../../../../../../node_modules/three/examples/js/controls/OrbitControls');

/**
 * Camera Class
 */
export class Controls implements BootableInterface, ModulesInterface {

    public instance;

    boot({ camera, renderer }) {

        this.instance = new THREE.TrackballControls(camera, renderer.domElement);
        this.instance.zoomSpeed = .005;
        this.instance.noPan = true;
        this.instance.maxDistance = 3000;
        this.instance.minxDistance = 500;
        this.instance.dynamicDampingFactor = 0.05;
        this.instance.enabled = false;
        this.instance.enableDamping = true;

        // this.instance.minPolarAngle = deg2rad(0);
        // this.instance.maxPolarAngle = deg2rad(90);

        // this.instance.enableDamping = true;
        // this.instance.dampingFactor = .03;
        // this.instance.minDistance = 500;
		// this.instance.maxDistance = 3000;
        // this.instance.enablePan = false;
        // this.instance.rotateSpeed = .05;
        // this.instance.zoomSpeed = 0.3;

    }

    update(time: number, delta: number): void {
        if (this.instance.enabled)
            this.instance.update();
    }

}
