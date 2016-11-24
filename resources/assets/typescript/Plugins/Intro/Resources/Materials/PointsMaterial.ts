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

            core: '/assets/hex-assets/hex.png',
            // point_squad: '/assets/point-squad.png',
            hexicle: '/assets/hex-assets/hexicle.png',
            point_1_1: '/assets/hex-assets/point-1.png',
            point_1_2: '/assets/hex-assets/point-2.png',
            point_1_3: '/assets/hex-assets/point-3.png',
            point_1_4: '/assets/hex-assets/point-4.png',
            point_1_5: '/assets/hex-assets/point-5.png',
            point_2_1: '/assets/hex-assets/point-4.png',
            point_2_2: '/assets/hex-assets/point-3.png',
            point_2_3: '/assets/hex-assets/point-2.png',
            point_2_4: '/assets/hex-assets/point-1.png',
            point_2_5: '/assets/hex-assets/point-5.png',
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
