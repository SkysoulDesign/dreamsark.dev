import { ObjectInterface } from "../../Interfaces/ObjectInterface";
import { Forgable } from "../../Abstracts/Forgable";
import { random, deg2rad } from "../../Helpers";

/**
 * Buttons
 */
export class Buttons extends Forgable implements ObjectInterface {

    get materials() {
        return {
            material: 'IntroDefaultMaterial'
        }
    }

    create(models, {material}) {

        let group = new THREE.Group();

        material.fog = false;

        const start = <THREE.Mesh>this.forge('start', material, {
            scale: 30,
            position: {
                x: 50, y: 75, z: 80
            }
        });

        const skip = <THREE.Mesh>this.forge('skip', material, {
            scale: 10,
            position: {
                x: 50, y: 83, z: 70
            }
        });

        group.add(start);
        group.add(skip);

        console.log(group);

        group.userData = {
            update: this.update.bind(this, group)
        };

        return group;

    }

    public update(group: THREE.Mesh, time) {

    }

}
