import {BootableInterface} from "../../../Interfaces/BootableInterface";

/**
 * Scene Class
 */
export class Scene extends THREE.Scene implements BootableInterface {

    boot(app) {
    }

    constructor() {
        super()
        this.fog = new THREE.FogExp2(0xe1f8ff, .002345);
    }

}
