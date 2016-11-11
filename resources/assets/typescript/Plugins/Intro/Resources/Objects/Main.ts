import { ObjectInterface } from "../../Interfaces/ObjectInterface";
import { extend } from "../../../../Helpers";
import { configureMaterial, resize, sprite } from "../../Helpers";
import { Forgable } from "../../Abstracts/Forgable";

/**
 * Character: Base
 */
export class Main extends Forgable implements ObjectInterface {

    get materials() {
        return {
            material: 'IntroDefaultMaterial'
        }
    }

    /**
     * Create Object
     *
     * @param models
     * @param material
     * @returns {THREE.Group}
     */
    create(models, {material}) {

        let group = new THREE.Group();

        group.add(this.forge('background', material, {
            widthFactor: 2.5,
            heightFactor: 1.5,
            position: {
                x: 50, y: 50, z: 0
            }
        }))

        group.add(this.forge('platform', material, {
            scale: 65, position: {
                x: 50,
                y: 75,
                z: 50
            }
        }))

        group.add(this.forge('planet', material, {
            scale: 20,
            position: {
                x: 10,
                y: 10,
                z: 50
            }
        }))

        group.add(this.forge('transition', material, {
            widthFactor: 2.5,
            heightFactor: 1.5,
            position: {
                x: 50, y: 200 * 1.5, z: 0
            }
        }))

        return group;

    }

}
