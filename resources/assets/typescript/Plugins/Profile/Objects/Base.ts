import {Character} from "../Abstract/Character";

/**
 * Character: Base
 */
export class Base extends Character {

    models() {
        return {
            base: '/models/Base.json',
        }
    }

    create(models){

        let material = this.material.get('baseMaterial').clone();
        material.skinning = false;

        return new THREE.Mesh(
            models.base, material
        )
    }

}
