import { ObjectInterface } from "../../Interfaces/ObjectInterface";
import { Forgable } from "../../Abstracts/Forgable";

/**
 * Engine
 */
export class Flare extends Forgable implements ObjectInterface {

    get materials() {
        return {
            material: 'IntroDefaultMaterial'
        }
    }

    create(models, {material}) {

        let flare = this.forge('flare', material, {
            scale: 100,
            position: {
                x: 50, y: 50, z: 80
            }
        });

        flare.scale.y = 0.1;

        flare['material'].opacity = 0;
        flare['material'].depthTest = false;

        return flare;

    }

}
