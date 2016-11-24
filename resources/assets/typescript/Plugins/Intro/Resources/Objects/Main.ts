import { ObjectInterface } from "../../Interfaces/ObjectInterface";
import { extend } from "../../../../Helpers";
import { configureMaterial, resize, sprite } from "../../Helpers";
import { Forgable } from "../../Abstracts/Forgable";

/**
 * Character: Base
 */
export class Main extends Forgable implements ObjectInterface {

    get models() {
        return {
            smoke: '/assets/models/Smoke2.json',
        }
    }

    get materials() {
        return {
            material: 'IntroDefaultMaterial',
        }
    }

    get animations() {
        return {
            animation: '/assets/models/SmokeAnim.anim'
        }
    }

    /**
     * Create Object
     *
     * @param models
     * @param material
     * @returns {THREE.Group}
     */
    create({smoke}, {material}) {

        let group = new THREE.Group();

        material.fog = false;

        group.add(this.forge('background', material, {
            widthFactor: 2.5,
            heightFactor: 1.5,
            position: {
                x: 50, y: 50, z: 0
            }
        }))

        group.add(this.forge('platform', material, {
            scale: 65, position: {
                x: 50,
                y: 75,
                z: 50
            }
        }))

        group.add(this.forge('planet', material, {
            scale: 20,
            position: {
                x: 10,
                y: 10,
                z: 50
            }
        }))

        group.add(this.forge('transition', material, {
            widthFactor: 2.5,
            heightFactor: 1.5,
            position: {
                x: 50, y: 200 * 1.6, z: 0
            }
        }))

        let mesh = this.forge('streak', material, {
            mesh: THREE.SkinnedMesh,
            geometry: smoke,
            scale: 40,
            position: {
                x: 50, y: 80, z: 70
            }
        })

        mesh.name = 'smoke';
        mesh['material'].skinning = true;

        group.add(mesh)

        // let mat = new THREE.MeshBasicMaterial({
        //     skinning: true,
        //     vertexColors: THREE.VertexColors
        // });

        // let mesh = new THREE.SkinnedMesh(
        //     smoke, mat
        // );

        // mesh.scale.setScalar(1);

        // // ship.visible = false;
        // mesh.name = 'smoke';

        // console.log(mesh.userData.animations);
        // group.add(mesh);


        return group;

    }

}
