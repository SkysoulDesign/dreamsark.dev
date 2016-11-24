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

        let skybox = this.forge('skybox', layers, {
            geometry: {
                create: (width, height) => {
                    return new THREE.SphereBufferGeometry(3000, 30, 30)
                }
            },
            uvs: false,
            position: {
                x: 50, y: 50, z: 80
            }
        });

        let stars = this.forge('stars', layers, {
            geometry: {
                create: (width, height) => {
                    return new THREE.SphereBufferGeometry(2500, 30, 30)
                }
            },
            uvs: false,
            position: {
                x: 50, y: 50, z: 80
            }
        });

        let nebula = this.forge('nebula', layers, {
            geometry: geometry,
            uvs: false
        }),
            nebula2 = nebula.clone(),
            nebula3 = nebula.clone(),
            nebula4 = nebula.clone();

        nebula2.rotation.y = deg2rad(90)
        nebula2.scale.setScalar(3);
        nebula3.rotation.set(deg2rad(50), deg2rad(45), deg2rad(80))
        nebula3.scale.setScalar(3);

        nebula4.rotation.set(deg2rad(25), deg2rad(180), deg2rad(30))
        nebula4.scale.setScalar(5);

        nebula.add(nebula2)
        nebula.add(nebula3)
        nebula.add(nebula4)

        let dirty = this.forge('dirty', layers, {
            geometry: geometry,
            uvs: false
        });

        let dust = this.forge('dust', layers, {
            geometry: geometry,
            uvs: false
        }),
            dust2 = dust.clone(),
            dust3 = dust.clone();

        dust2.rotation.z = deg2rad(90)
        dust2.scale.setScalar(8);
        dust3.rotation.set(5, deg2rad(150), 8)
        dust3.scale.setScalar(11);
        dust.add(dust2)
        dust.add(dust3)

        dust.rotation.y = deg2rad(180)
        nebula.rotation.set(deg2rad(90), deg2rad(90), 0)

        dirty.scale.set(-1, 1, 1)
        dust.scale.set(-1, 1, 1)
        stars.scale.set(-1, 1, 1)
        nebula.scale.set(-1, 1, 1)

        dirty.scale.setScalar(20)
        dust.scale.setScalar(10)
        stars.scale.setScalar(6)
        nebula.scale.setScalar(9)
        skybox.scale.setScalar(5)

        // group.add(dirty);
        group.add(dust);
        // group.add(stars);
        // group.add(nebula);
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
