import { MaterialInterface } from "../../Interfaces/LoadersInterfaces";

export class IntroDefaultMaterial implements MaterialInterface {

    public get textures() {
        return {
            'sprite-1.png': '/assets/img/sprite-1.png',
            'sprite-2.png': '/assets/img/sprite-2.png',
        }
    }

    public create(textures) {

        let material = new THREE.MeshBasicMaterial({
            // map: textures['sprite-1.png'],
            transparent: true,
        })

        material['userData'] = textures

        return material;
    }

}
