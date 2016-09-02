import Object3D = THREE.Object3D;
import {ObjectInterface} from "../../Interfaces/ObjectInterface";

export class Actor implements ObjectInterface {

    get models() {
        return {
            character: '/models/Actor.json',
            base: '/models/Actor.json',
            top: '/models/Actor.json',
        }
    }

    get materials() {
        return {
            basic: 'basicMaterial'
        }
    }

    get animations() {
        return {
            base: 'baseAnimation'
        }
    }

    /**
     * Create Object
     *
     * @param models
     * @param materials
     * @returns {THREE.SkinnedMesh}
     */
    create(models, {basic}, animations): Object3D {

        var geometry = new THREE.BoxGeometry(100, 100, 100);

        console.log(models)

        return new THREE.Mesh(geometry, basic);
    }
}
