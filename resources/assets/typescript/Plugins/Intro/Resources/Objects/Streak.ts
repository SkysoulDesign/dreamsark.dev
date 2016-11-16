import { ObjectInterface } from "../../Interfaces/ObjectInterface";
import { extend } from "../../../../Helpers";
import { configureMaterial, resize, sprite } from "../../Helpers";
import { Forgable } from "../../Abstracts/Forgable";

/**
 * Character: Base
 */
export class Streak extends Forgable implements ObjectInterface {

    get materials() {
        return {
            material: 'ShaderMaterial'
        }
    }

    /**
     * Create Object
     *
     * @param models
     * @param THREE.MeshBasicMaterial material
     * @returns {THREE.Group}
     */
    create(models, {material}) {

        const streak = <THREE.Mesh>this.forge('streak', material, {
            scale: 20,
            rotation: {
                x: 0, y: 0, z: 90
            },
            position: {
                x: 50, y: 50, z: 100
            }
        });

        streak.scale.setX(3)

        // streak.material.blending = THREE.AdditiveBlending;
        // streak.material.opacity = .8
        // streak.material.transparent = true;
        // streak.material.side = THREE.DoubleSide;

        streak.userData.update = this.update.bind(this, streak);

        return streak;

    }

    public createGeometry(width: number, height: number, view, geometry: any) {
        return new THREE.PlaneGeometry(width, height, 30, 30)
    }

    public update(streak: THREE.Mesh, time) {
        streak.material['userData'].uniforms.angle.value += 0.4;
    }

}
