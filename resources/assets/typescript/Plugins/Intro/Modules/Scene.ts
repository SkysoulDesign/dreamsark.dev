import { BootableInterface } from "../../../Interfaces/BootableInterface";
import { ModulesInterface } from "../Interfaces/ModulesInterface";

/**
 * Scene Class
 */
export class Scene extends THREE.Scene implements BootableInterface, ModulesInterface {

    constructor() {
        super()
    }

    boot(app) {
        // this.fog = <any>new THREE.FogExp2(0x11121d, 0.0008)
    }

    update(time: number, delta: number): void {
    }

}
