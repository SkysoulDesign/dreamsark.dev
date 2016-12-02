import { ObjectInterface } from "../../Interfaces/ObjectInterface";
import { extend } from "../../../../Helpers";
import { configureMaterial, resize, sprite, deg2rad } from "../../Helpers";
import { Forgable } from "../../Abstracts/Forgable";

/**
 * Character: Base
 */
export class Galaxy extends Forgable implements ObjectInterface {

    get materials() {
        return {
            material: 'IntroDefaultMaterial'
        }
    }

    get models() {
        return {
            geometry: '/assets/models/Skybox.json',
        }
    }

    /**
     * Create Object
     *
     * @param models
     * @param material
     * @returns {THREE.Group}
     */
    create({geometry}, {material}) {

        let group = new THREE.Group();

        let layers: THREE.MeshBasicMaterial = material.clone();

        layers.side = THREE.BackSide;
        layers.blending = THREE.AdditiveBlending;
        layers.opacity = .8;
        layers.depthTest = false;
        layers.fog = false;
        layers['userData'] = material['userData'];
        layers.map = material.userData.skybox;

        // let skybox = this.forge('skybox', layers, {
        //     geometry: {
        //         create: (width, height) => {
        //             return new THREE.SphereBufferGeometry(3000, 30, 30)
        //         }
        //     },
        //     uvs: false,
        //     position: {
        //         x: 50, y: 50, z: 80
        //     }
        // });

        // let skyboxMaterial = new THREE.MeshBasicMaterial({
        //     map: material.userData.skybox
        // })

        let skybox = new THREE.Mesh(
            new THREE.SphereBufferGeometry(3000, 30, 30), layers
        )

        // skybox.position.copy(skyboxOld.position)

        // skybox['material'].map = material.userData.skybox;

        // let stars = this.forge('stars', layers, {
        //     geometry: {
        //         create: (width, height) => {
        //             return new THREE.SphereBufferGeometry(2500, 30, 30)
        //         }
        //     },
        //     uvs: false,
        //     position: {
        //         x: 50, y: 50, z: 80
        //     }
        // });

        // let nebula = this.forge('nebula', layers, {
        //     geometry: geometry,
        //     uvs: false
        // }),
        //     nebula2 = nebula.clone(),
        //     nebula3 = nebula.clone(),
        //     nebula4 = nebula.clone();

        // nebula2.rotation.y = deg2rad(90)
        // nebula2.scale.setScalar(3);
        // nebula3.rotation.set(deg2rad(50), deg2rad(45), deg2rad(80))
        // nebula3.scale.setScalar(3);

        // nebula4.rotation.set(deg2rad(25), deg2rad(180), deg2rad(30))
        // nebula4.scale.setScalar(5);

        // nebula.add(nebula2)
        // nebula.add(nebula3)
        // nebula.add(nebula4)

        // let dirty = this.forge('dirty', layers, {
        //     geometry: geometry,
        //     uvs: false
        // });

        let nb1 = this.forge('nb1', layers, {
            geometry: geometry,
            uvs: false
        })

        let nb2 = this.forge('nb2', layers, {
            geometry: geometry,
            uvs: false
        })

        let nb3 = this.forge('nb3', layers, {
            geometry: geometry,
            uvs: false
        })

        let dust = this.forge('dust', layers, {
            geometry: geometry,
            uvs: false
        }),
            dust2 = dust.clone(),
            dust3 = dust.clone(),
            dust4 = dust.clone(),
            dust5 = dust.clone();

        nb1.rotation.set(deg2rad(0), deg2rad(180), deg2rad(90))
        nb2.rotation.set(deg2rad(90), deg2rad(45), deg2rad(180))
        nb3.rotation.set(deg2rad(180), deg2rad(145), deg2rad(270))

        nb1.scale.setScalar(100);
        nb2.scale.setScalar(150);
        nb3.scale.setScalar(80);

        console.log('nebulass')
        console.log(nb1)
        console.log(nb2)
        console.log(nb3)
        console.log('end-nebulass')

        group.add(nb1);
        group.add(nb2);
        group.add(nb3);

        dust2.rotation.set(deg2rad(90), deg2rad(0), deg2rad(0))
        dust3.rotation.set(deg2rad(180), deg2rad(0), deg2rad(0))
        dust4.rotation.set(deg2rad(270), deg2rad(0), deg2rad(0))
        dust5.rotation.set(deg2rad(270), deg2rad(90), deg2rad(60))
        dust2.scale.setScalar(8);
        dust3.scale.setScalar(11);
        dust4.scale.setScalar(7);
        dust5.scale.setScalar(11);
        dust.add(dust2)
        dust.add(dust3)
        dust.add(dust4)
        dust.add(dust5)

        dust.rotation.y = deg2rad(180)
        // nebula.rotation.set(deg2rad(90), deg2rad(90), 0)

        // dirty.scale.set(-1, 1, 1)
        dust.scale.set(-1, 1, 1)
        // stars.scale.set(-1, 1, 1)
        // nebula.scale.set(-1, 1, 1)

        // dirty.scale.setScalar(20)
        dust.scale.setScalar(10)
        // stars.scale.setScalar(6)
        // nebula.scale.setScalar(9)
        skybox.scale.setScalar(5)

        // group.add(stars);
        // group.add(nebula);
        // group.add(dirty);

        group.add(dust);
        group.add(skybox);

        group.userData = {
            update: this.update.bind(this, group)
        }

        group.position.setZ(-5000)

        return group;

    }

    update(galaxy: THREE.Group, time) {

        // galaxy.children.forEach(child => {
        //     child.rotation.y += child.userData.speed * 0.001
        // })

    }

}
