import {BootableInterface} from "../../../Interfaces/BootableInterface";
import {ModulesInterface} from "../Interfaces/ModulesInterface";

/**
 * Camera Class
 */
export class Camera extends THREE.PerspectiveCamera implements BootableInterface, ModulesInterface {

    boot(app) {

        this.fov = 20;
        this.aspect = app.browser.aspect;
        this.near = 1;
        this.far = 2000;
        this.position.z = 500;

        this.updateProjectionMatrix();

    }

    update(time: number, delta: number): void {
    }

}
