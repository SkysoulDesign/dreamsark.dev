import { ObjectInterface } from "../../Interfaces/ObjectInterface";
import { Forgable } from "../../Abstracts/Forgable";
import { random, deg2rad } from "../../Helpers";

/**
 * Tunnel
 */
export class Tunnel extends Forgable implements ObjectInterface {

    get materials() {
        return {
            material: 'IntroDefaultMaterial'
        }
    }

    create(models, {material}) {

        let geometry = new THREE.SphereBufferGeometry(5000, 50, 50),
            tunnel = new THREE.Mesh(geometry,
                new THREE.MeshBasicMaterial({
                    transparent: true,
                    blending: THREE.AdditiveBlending,
                    map: material.userData.tunnel,
                    side: THREE.BackSide,
                    depthTest: false,
                    fog: false,
                    opacity: 0.1
                })
            );

        material.userData.tunnel.wrapT = material.userData.tunnel.wrapS = THREE.RepeatWrapping;
        material.userData.tunnel.repeat.set(1, 2);

        tunnel.rotation.x = deg2rad(90);

        tunnel.userData.update = this.update.bind(this, tunnel);
        tunnel.userData.morph = function () {

            // let positions = geometry.getAttribute('position');

            // for (let i = 0; i < positions.count; i++) {


            //     let n =Math.random() < 0.5 ? -1 : 1;

            //         positions['array'][i * 3] +=  n*(Math.random() * 0.3);
            //         positions['array'][i * 3 + 1] += n*(Math.random() * 0.3);
            //         positions['array'][i * 3 + 2] += n*(Math.random() * 0.3);

            // }

            // positions['needsUpdate'] = true;

        }

        return tunnel;

    }

    public createGeometry(width: number, height: number, view, geometry: any) {
        return new THREE.CylinderGeometry(width, height, 1024, 16, 32, true)
    }

    public update(tunnel: THREE.Object3D, time) {

        tunnel['material']['map'].offset.y -= 0.003;
        tunnel['material']['map'].offset.x -= 0.003;

        tunnel.userData.morph()

    }

}
