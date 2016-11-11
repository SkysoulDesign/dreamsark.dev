import {AbstractMaterial} from "../Abstract/AbstractMaterial";

/**
 * BaseMaterial Class
 */
export class BaseMaterial extends AbstractMaterial {

    textures() {
        return {
            base: '/models/texture.png'
        }
    }

    loaded(material, textures) {
        material.map = textures.base;
        material.needsUpdate = true;
    }

    material() {
        return new THREE.MeshStandardMaterial({
            skinning: true,
            shading: THREE.FlatShading,
            roughness: 1,
            metalness: 1
        })
    }

}
