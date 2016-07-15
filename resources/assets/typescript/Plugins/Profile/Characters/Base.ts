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
        return new THREE.Mesh(
            models.base,
            // this.material.get('baseMaterial')
        )
    }

}
