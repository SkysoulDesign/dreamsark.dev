import { MaterialInterface } from "../../Interfaces/LoadersInterfaces";

export class IntroDefaultMaterial implements MaterialInterface {

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
            tunnel: '/assets/img/tunnel.png',
            skybox: '/assets/img/skybox.jpg',
            glow: '/assets/img/glow.png',
            dot: '/assets/img/dot.png',

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
