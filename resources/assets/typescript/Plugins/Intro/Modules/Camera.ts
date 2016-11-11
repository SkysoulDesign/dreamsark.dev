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

    /**
     * Calculate view port size within a given distance
     *
     * @param distance
     * @returns {width: number, height: number}
     */
    getViewSize(distance: number) {

        let fov = this.fov * Math.PI / 180,
            depth = -(this.far / 2 + ((-(this.position.z / 2) - this.far / 2) / 100) * distance),
            height = 2 * Math.tan(fov / 2) * (this.position.z - depth),
            width = height * this.aspect;

        return {
            width, height, depth
        }
    }
}
