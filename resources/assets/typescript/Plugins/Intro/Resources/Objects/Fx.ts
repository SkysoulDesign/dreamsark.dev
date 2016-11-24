import { ObjectInterface } from "../../Interfaces/ObjectInterface";
import { Forgable } from "../../Abstracts/Forgable";
import { random, deg2rad } from "../../Helpers";

/**
 * Tunnel
 */
export class Fx extends Forgable implements ObjectInterface {

    get materials() {
        return {
            material: 'FXShaderMaterial'
        }
    }

    create(models, {material}) {

        let group = new THREE.Group(),
            scaleY = 1;

        const bottom = <THREE.Mesh>this.forge('light-stroke', material, {
            scale: 20,
            rotation: {
                x: 90, y: 0, z: 90
            },
            position: {
                x: 50, y: 100, z: 100
            }
        });

        bottom.scale.set(50, scaleY, 1);

        const top = this.forge('light-stroke', material, {
            scale: 20,
            rotation: {
                x: 90, y: 0, z: 90
            },
            position: {
                x: 50, y: 0, z: 100
            }
        })

        top.scale.set(50, scaleY, 1);

        const left = this.forge('light-stroke', material, {
            scale: 20,
            rotation: {
                x: 90, y: 90, z: 90
            },
            position: {
                x: 0, y: 50, z: 100
            }
        })

        left.scale.set(50, scaleY, 1);

        const right = this.forge('light-stroke', material, {
            scale: 20,
            rotation: {
                x: 90, y: 90, z: 90
            },
            position: {
                x: 100, y: 50, z: 100
            }
        })

        right.scale.set(50, scaleY, 1);

        bottom.material['userData'].uniforms.alpha.value = 0;
        bottom.material['userData'].uniforms.warp.value = 5;
        bottom.material['userData'].uniforms.waves.value = 10;
        bottom.material['userData'].uniforms.frequency.value = 3;
        bottom.material['userData'].uniforms.speed.value = 1;

        console.log(bottom.material['userData'].uniforms)

        // bottom.position.setY(0);
        // top.position.setY(0);
        // left.position.setX(0);
        // right.position.setX(0);

        group.add(bottom);
        group.add(top);
        group.add(left);
        group.add(right);

        group.userData = {
            uniforms: bottom.material['userData'].uniforms,
            update: this.update.bind(this, group)
        };

        return group;

    }

    public createGeometry(width: number, height: number, view, geometry: any) {
        return new THREE.PlaneGeometry(width, height, 30, 30)
    }

    public update(group: THREE.Mesh, time) {

        group.rotation.z += group['userData'].uniforms.speed.value;

        group.children.forEach(child => {
            child.scale.setX(Math.random() * 20 + 50)
            child.scale.setY(Math.random())
        })

        group['userData'].uniforms.angle.value += group['userData'].uniforms.frequency.value;
    }

}
