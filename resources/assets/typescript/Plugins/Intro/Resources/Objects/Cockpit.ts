import { ObjectInterface } from "../../Interfaces/ObjectInterface";
import { Forgable } from "../../Abstracts/Forgable";

/**
 * Engine
 */
export class Cockpit extends Forgable implements ObjectInterface {

    get materials() {
        return {
            material: 'IntroDefaultMaterial'
        }
    }

    create(models, {material}) {

       let cockpit = this.forge('cockpit', material, {
            scale: 100,
            position: {
                x: 50, y: 50, z: 150
            }
        });

        cockpit['material'].opacity = 0;
        cockpit['material'].depthTest = false;

        return cockpit;

    }

}
