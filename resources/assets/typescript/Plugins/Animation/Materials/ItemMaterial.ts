import {AbstractMaterial} from "../Abstract/AbstractMaterial";

/**
 * BaseMaterial Class
 */
export class ItemMaterial extends AbstractMaterial {

    textures() {
        return {
            base: '/img/default.png'
        }
    }

    loaded(material, textures) {
        material.map = textures.base;
        material.needsUpdate = true;
    }

    material() {
        return new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide
        })
    }

}
