import { MaterialInterface } from "../../Interfaces/LoadersInterfaces";

export class PointsMaterial implements MaterialInterface {

    public get textures() {
        return {
            'sprite-1.png': '/assets/img/sprite-1.png',
            'sprite-2.png': '/assets/img/sprite-2.png',
        }
    }

    public create(textures) {

        let material = new THREE.PointsMaterial({
            color: 0x351c41,
            size: 30,
            blending: THREE.AdditiveBlending,
            // map: texture,
            transparent: true,
            alphaTest: 0.01,
            sizeAttenuation: true,
            vertexColors: THREE.VertexColors,
        });

        material['userData'] = textures

        return material;

    }

}
