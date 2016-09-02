import {BootableInterface} from "../../../Interfaces/BootableInterface";
import {ModulesInterface} from "../Interfaces/ModulesInterface";

/**
 * Scene Class
 */
export class Scene extends THREE.Scene implements BootableInterface, ModulesInterface {

    constructor() {
        super()
    }

    boot(app) {
    }

    update(time: number, delta: number): void {
    }

}
