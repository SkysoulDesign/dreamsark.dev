
import {Character} from "../Abstract/Character";

/**
 * Character: Actor
 */
export class ItemA extends Character {

    models() {
        return {
            character: '/models/3DArtist.json',
        }
    }

    create(models){

        let material = this.material.get('itemMaterial'),
            l_Geometry = new THREE.PlaneGeometry(10,10);

        return new THREE.Mesh(
            l_Geometry, material
        )
    }

}
