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

        let distance = 5024,
            geometry = new THREE.CylinderGeometry(500, 100, distance, 20, 100, true),
            tunnel = new THREE.Mesh(geometry,
                new THREE.MeshBasicMaterial({
                    map: material.userData.tunnel,
                    transparent: true,
                    side: THREE.DoubleSide,
                    // blending: THREE.AdditiveBlending,
                    // map: material.userData.tunnel,
                    depthTest: true,
                    fog: true,
                    opacity: 0
                })
            );

        material.userData.tunnel.wrapT = material.userData.tunnel.wrapS = THREE.RepeatWrapping;
        material.userData.tunnel.repeat.set(1, 2);

        tunnel.rotation.x = deg2rad(90);
        tunnel.position.z = -10000;//-5000 / 2 + 500;

        let opt = {
            waves: 0.7,
            width: 30,
            height: 60,
            speed: 0.003,
            xSpeed: 0
        }

        const anim = this.vertex(geometry, function (origin, position, delta, now) {

            let l_Value1 = origin.y / distance * 360;
            let l_Value2 = Math.floor(l_Value1) * opt.waves; //waves

            position.x = origin.x + Math.sin(now / 10 * Math.PI / 180 + l_Value2 * Math.PI / 180 + origin.y / distance) * opt.width; //distance
            position.z = origin.z + Math.cos(now / 10 * Math.PI / 180 + l_Value2 * Math.PI / 180 + origin.y / distance * 4) * opt.height;

        })

        tunnel.userData.update = this.update.bind(this, tunnel, anim);
        tunnel.userData.controls = opt

        return tunnel;

    }

    public update(tunnel: THREE.Object3D, anim, time, delta) {

        anim.update(delta, time);

        tunnel['material'].map.offset.y = -time / 2 * tunnel.userData.controls.speed;
        tunnel['material'].map.offset.x = -time / 6 * tunnel.userData.controls.xSpeed;

    }

    vertex(geometry: THREE.Geometry, transformFct: Function) {

        let nVertices = geometry.vertices.length;
        let origVertices = new Array(nVertices)

        for (let i = 0; i < nVertices; i++) {
            origVertices[i] = geometry.vertices[i].clone();
        }

        return {
            update: (delta, now) => {
                for (let i = 0; i < geometry.vertices.length; i++) {
                    let origin = origVertices[i];
                    let position = geometry.vertices[i];
                    transformFct(origin, position, delta, now);
                }
                geometry.verticesNeedUpdate = true;
            }
        }

    }

}
