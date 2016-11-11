import {ObjectInterface} from "../../Interfaces/ObjectInterface";
import {Intro} from "../../Intro";

/**
 * Character: Base
 */
export class Base implements ObjectInterface {

    constructor(app: Intro){};

    get models() {
        return {
            base: '/models/Base.json',
        }
    }

    get materials() {
        return {
            material: 'CharacterDefaultMaterial'
        }
    }

    create({base}, {material}) {

        material = material.clone();
        material.skinning = false;

        return new THREE.Mesh(
            base, material
        )
    }

}
