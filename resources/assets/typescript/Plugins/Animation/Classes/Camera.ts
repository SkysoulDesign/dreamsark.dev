import {BootableInterface} from "../../../Interfaces/BootableInterface";

/**
 * Camera Class
 */
export class Camera extends THREE.PerspectiveCamera implements BootableInterface {

    boot(app) {

        this.fov = 20;
        this.aspect = app.browser.aspect;
        this.near = 1;
        this.far = 2000;
        this.position.z = -180;

        this.updateProjectionMatrix();

    }

}
