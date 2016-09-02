import {MaterialInterface} from "../../Interfaces/LoadersInterfaces";

export class CharacterDefaultMaterial implements MaterialInterface {

    public get textures() {
        return {
            texture: '/models/texture.png',

            // large: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Pleiades_large.jpg',
            // larger: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/ESC_large_ISS022_ISS022-E-11387-edit_01.JPG'
        }
    }

    public create({texture}) {
        return new THREE.MeshStandardMaterial({
            skinning: true,
            shading: THREE.FlatShading,
            roughness: 1,
            metalness: 1,
            map: texture
        })
    }

}
