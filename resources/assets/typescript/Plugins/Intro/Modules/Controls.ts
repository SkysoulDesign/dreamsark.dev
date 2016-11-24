import { BootableInterface } from "../../../Interfaces/BootableInterface";
import { ModulesInterface } from "../Interfaces/ModulesInterface";

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
        this.instance.maxDistance = 1500;
        this.instance.minxDistance = 200;
        this.instance.dynamicDampingFactor = 0.05;
        this.instance.enabled = false;
        // this.instance.enableDamping = true;

    }

    update(time: number, delta: number): void {
        if (this.instance.enabled)
            this.instance.update();
    }

}
