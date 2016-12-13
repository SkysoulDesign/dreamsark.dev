import { BootableInterface } from "../../../Interfaces/BootableInterface";
import { ModulesInterface } from "../Interfaces/ModulesInterface";
import { Tween } from "./Tween";

/**
 * Camera Class
 */
export class Camera extends THREE.PerspectiveCamera implements BootableInterface, ModulesInterface {

    private tween;
    private controls;

    boot({tween, browser, controls}) {

        this.tween = tween;
        this.controls = controls;
        this.fov = 20;
        this.aspect = browser.aspect;
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

    moveTo(object: THREE.Object3D | THREE.Vector3, callback: Function, distance: number = 200, duration: number = 1, ease: string = Tween.CUBICIN) {

        let original = object instanceof THREE.Object3D ? object.position : object,
            clone = this.clone()

        clone.position.copy(original)
        clone.translateZ(distance)

        let animation = this.tween.animate({
            origin: {
                position: this.position
            },
            target: {
                position: {
                    x: clone.position.x,
                    y: clone.position.y,
                    z: clone.position.z
                }
            },
            duration: duration,
            ease: ease,
            after: callback            
        })

    }
}
