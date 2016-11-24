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

    moveTo(object: THREE.Object3D, callback:Function) {

        let distance = 200,
            clone = this.clone();

        clone.position.copy(object.position)
        clone.translateZ(200)

        // let matrix = new THREE.Matrix4();
        // matrix.setPosition(new THREE.Vector3(0, 10, 0))

        // this.position.applyMatrix4(matrix);

        // this.quaternion.copy(object.quaternion)
        // this.position.copy(object.position)
        // this.position.addScalar(-100)
        // this.lookAt(object.position)

        // let positions = object['geometry'].attributes.position.array;
        // let position = new THREE.Vector3(
        //     positions[0], positions[1], positions[2]
        // )

        // clone.position.set(position.x - distance, position.y - distance, position.z - distance);

        // this.lookAt(position);
        // this.position.copy(position);
        // this.position.z += -100

        var initialQuaternion = this.quaternion.clone();
        var endingQuaternion = object.quaternion;
        var targetQuaternion = new THREE.Quaternion();

        let animation = this.tween.animate({
            origin: {
                position: this.position
            },
            target: {
                position: {
                    x: clone.position.x,
                    y: clone.position.y,
                    z: clone.position.z,
                }
            },
            duration: 1,
            ease: Tween.QUADINOUT,
            after: callback,
            update: ({position, time}) => {

                // this.position.x = position.x.value
                // this.position.y = position.y.value
                // this.position.z = position.z.value

                // this.controls.instance.target.copy(
                //     new THREE.Vector3(
                //         position.x.value,
                //         position.y.value,
                //         position.z.value,
                //     )
                // )

                // this.position.x = position.x.value;
                // this.position.y = position.y.value;
                // this.position.z = position.z.value;

                // THREE.Quaternion.slerp(
                //     initialQuaternion, endingQuaternion, targetQuaternion, time.value
                // );

                // this.setRotationFromQuaternion(targetQuaternion);

            }
        })

    }
}
