import { ObjectInterface } from "../../Interfaces/ObjectInterface";
import { extend } from "../../../../Helpers";
import { configureMaterial, resize, sprite } from "../../Helpers";
import { Forgable } from "../../Abstracts/Forgable";

/**
 * Character: Base
 */
export class Debris extends Forgable implements ObjectInterface {

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

        const debris = this.forge('debris', material, {
            scale: 70,
            position: {
                x: -10, y: -220, z: 5
            }
        });

        debris.userData.update = this.update.bind(this, debris);

        debris['material'].fog = false;

        return debris;

    }

    public update(debris: THREE.Object3D) {

        let {height} = debris.userData.meta.view;

        if (debris.position.y >= -height) {
            debris.position.y -= 10;//1;
        } else {
            return true;
        }

    }

}
