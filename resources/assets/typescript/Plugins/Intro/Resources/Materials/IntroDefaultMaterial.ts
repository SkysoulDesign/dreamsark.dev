import { MaterialInterface } from "../../Interfaces/LoadersInterfaces";

export class IntroDefaultMaterial implements MaterialInterface {

    public get textures() {
        return {
            'sprite-1.png': '/assets/img/sprite-1.png',
            'sprite-2.png': '/assets/img/sprite-2.png',
            'sprite-3.png': '/assets/img/sprite-3.png',
            'sprite-4.png': '/assets/img/sprite-4.png',
            'sprite-5.png': '/assets/img/sprite-5.png',
            // 'sprite-6.png': '/assets/img/sprite-6.png',
            // 'sprite-7.png': '/assets/img/sprite-7.png',
            // 'sprite-8.png': '/assets/img/sprite-8.png',
            // 'sprite-9.png': '/assets/img/sprite-9.png',
            tunnel: '/assets/img/tunnel.png',
            skybox: '/assets/img/skybox.jpg',
            universe: '/assets/img/universe-map.jpg',
            cubeSpace: '/assets/img/universe-square.jpg',
            'nebula-far': '/assets/img/nebula-far.png',
            'nebula-near': '/assets/img/nebula-near.png',
            glow: '/assets/img/glow.png',
            dot: '/assets/img/dot.png',
            lens0: '/assets/img/lensflare0.png',
            lens1: '/assets/img/lensflare1.png',
            lens2: '/assets/img/lensflare2.png',
            lens3: '/assets/img/lensflare3.png',
            'flare-ring': '/assets/img/flare-ring.png'

        }
    }

    public create(textures) {

        let material = new THREE.MeshBasicMaterial({
            // map: textures['sprite-1.png'],
            transparent: true,
            // depthWrite: false
            // blending: THREE.NormalBlending            
        })

        material['userData'] = textures

        return material;
    }

}
