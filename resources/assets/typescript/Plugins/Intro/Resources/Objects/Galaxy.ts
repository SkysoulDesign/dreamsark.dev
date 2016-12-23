import { ObjectInterface } from "../../Interfaces/ObjectInterface";
import { extend } from "../../../../Helpers";
import { configureMaterial, resize, sprite, deg2rad, configureTexture } from "../../Helpers";
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

        let layers: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({
            map: material.userData.cubeSpace,
            side: THREE.BackSide
        });

        // layers.side = ;
        // layers.blending = THREE.NormalBlending;
        // layers.opacity = 1;
        // layers.transparent = true;
        // layers.depthTest = false;
        // layers.alphaTest = 0.01;
        // layers.fog = false;
        layers['userData'] = material['userData'];
        // layers.map = material.userData.universe
        // layers.map =
        // layers.map = configureTexture(this.sprite, material.userData, 'universe-square');

        // let skybox = new THREE.Mesh(
        //     new THREE.CubeGeometry(10000, 10000, 10000, 1, 1, 1), layers
        // )

        let nebulaFarMaterial = layers.clone()
        nebulaFarMaterial.map = material.userData['nebula-far'];
        nebulaFarMaterial.blending = THREE.AdditiveBlending;
        nebulaFarMaterial.transparent = true;

        let nebulaNearMaterial = nebulaFarMaterial.clone()
        nebulaFarMaterial.map = material.userData['nebula-near'];


        let nebulaFar = new THREE.Mesh(
            new THREE.SphereBufferGeometry(6000, 30, 30), nebulaFarMaterial
        )

        let nebulaNear = new THREE.Mesh(
            new THREE.SphereBufferGeometry(6000, 30, 30), nebulaNearMaterial
        )

        nebulaFar.scale.setScalar(30 * 30)
        nebulaFar.position.set(0, 0, 0)
        nebulaFar.material['fog'] = false;

        nebulaFar.userData.velocity = .008

        nebulaNear.scale.setScalar(30 * 5)
        nebulaNear.position.set(0, 0, 0)
        nebulaNear.material['fog'] = false;

        nebulaNear.userData.velocity = .005

        console.log(nebulaNear)
        console.log(nebulaFar)


        group.add(nebulaFar);
        group.add(nebulaNear);

        group.userData = {
            update: this.update.bind(this, group)
        }

        group.position.setZ(-5000)

        return group;

    }

    update(galaxy: THREE.Group, time) {

        galaxy.children.forEach(child => {
            child.rotation.y += (0.001 + child.userData.velocity) * 0.05
        })

    }

}
