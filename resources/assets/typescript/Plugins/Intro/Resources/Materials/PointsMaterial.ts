import { MaterialInterface } from "../../Interfaces/LoadersInterfaces";

export class PointsMaterial implements MaterialInterface {

    public get textures() {
        return {
            'sprite-1.png': '/assets/img/sprite-1.png',
            'sprite-2.png': '/assets/img/sprite-2.png',
            'sprite-3.png': '/assets/img/sprite-3.png',
            'sprite-4.png': '/assets/img/sprite-4.png',
            'sprite-5.png': '/assets/img/sprite-5.png',
            'sprite-6.png': '/assets/img/sprite-6.png',
            'sprite-7.png': '/assets/img/sprite-7.png',
            'sprite-8.png': '/assets/img/sprite-8.png',
            core: '/assets/hex-assets/hex.png',
            tunnel: '/assets/img/tunnel.jpg',

            // point_squad: '/assets/point-squad.png',
            hexicle: '/assets/hex-assets/hexicle.png',
        }
    }

    public create(textures) {

        let material = new THREE.PointsMaterial({
            color: 0x351c41,
            size: 30,
            blending: THREE.AdditiveBlending,
            // map: texture,
            transparent: true,
            alphaTest: 0.001,
            sizeAttenuation: true,
            vertexColors: THREE.VertexColors,
        });

        material['userData'] = textures

        return material;

    }

}
