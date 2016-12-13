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
        // layers.blending = THREE.AdditiveBlending;
        layers.opacity = .8;
        layers.transparent = true;
        layers.depthTest = true;
        layers.fog = false;
        layers['userData'] = material['userData'];
        layers.map = material.userData.skybox;

        let skybox = new THREE.Mesh(
            new THREE.SphereBufferGeometry(5000, 30, 30), layers
        )

        let nb1 = this.forge('nb1', layers, {
            geometry: geometry,
            uvs: false
        })

        let nb2 = this.forge('nb2', layers, {
            geometry: geometry,
            uvs: false
        })

        let nb3 = this.forge('nb2', layers, {
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

        nb1.scale.setScalar(5);
        nb2.scale.setScalar(6);
        nb3.scale.setScalar(7);

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

        dust.scale.set(-1, 1, 1)
        dust.scale.setScalar(10)
        skybox.scale.setScalar(50)
        skybox.position.set(0, 0, 0)

        /**
         * Set all child to the origin 
         */
        dust.children.forEach(child => child.position.set(0, 0, 0));
        [nb1, nb2, nb3].forEach(child => child.position.set(0, 0, 0));

        group.add(nb1);
        group.add(nb2);
        group.add(nb3);
        // group.add(dust);
        group.add(skybox);

        group.userData = {
            materials: [skybox.material, nb1['material'], nb2['material'], nb3['material']],
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
