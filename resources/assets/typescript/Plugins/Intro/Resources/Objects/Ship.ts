import { ObjectInterface } from "../../Interfaces/ObjectInterface";
import { Forgable } from "../../Abstracts/Forgable";
import { random } from "../../Helpers";

/**
 * Ship
 */
export class Ship extends Forgable implements ObjectInterface {

    get models() {
        return {
            geometry: '/assets/models/Ship.json',
        }
    }

    get materials() {
        return {
            material: 'IntroDefaultMaterial',
            shader: 'ShaderMaterial'
        }
    }

    create({geometry}, {material, shader}) {

        material.fog = false;

        let group = new THREE.Group(),
            ship = this.forge('ship', material, {
                geometry: geometry,
                scale: 20,
                uvs: false,
                position: {
                    x: 50,
                    y: 45,
                    z: 65
                }
            }),
            clones = [];

        const streak = <THREE.Mesh>this.forge('streak', shader, {
            geometry: {
                create: function (width, height) {
                    return new THREE.PlaneGeometry(width, height, 30, 30)
                }
            },
            scale: 20,
            rotation: {
                x: 0, y: 0, z: 90
            },
            position: {
                x: 50, y: 90, z: 80
            }
        });

        streak.scale.set(3, .1, 1)

        ship.add(streak);

        group.add(ship);

        for (let i = 0; i <= 5; i++) {
            clones.push(this.clone(ship));
        }

        clones.forEach(clone => group.add(clone));

        ship.name = 'logo';

        streak.visible = false;

        streak.translateOnAxis(new THREE.Vector3(1.8, 0, 0), 20)

        group.userData = {
            taill: streak,
            uniforms: streak.material['userData'].uniforms,
            booster: 1,
            update: this.update.bind(this, group),
        }

        return group

    }

    public update(object: THREE.Object3D, time) {

        object['userData'].uniforms.angle.value += object['userData'].uniforms.frequency.value;
        object['userData'].taill.rotation.y += .9;

        // object['userData'].streak.scale.setX(Math.sin(time));

        object.children.forEach((child, i) => {

            if (child.name === 'logo') return;

            child.children[0].scale.set(Math.abs(Math.sin(time) * .2) + 2, .2, 1)

            if (child.position.y > child.userData.respawnAt) {
                this.respawn(child)
            }

            if (child.position.y < -child.userData.respawnAt) {
                this.respawn(child, false)
            }

            child.position.y += child.userData.velocity * object.userData.booster;

        })

    }

    /**
     * Respawn Object
     */
    private respawn(object: THREE.Object3D, up: boolean = true) {

        let {width, height} = object.userData.meta.size,
            {view, size, position, defaults} = this.getDimentions({
                width: width,
                height: height,
                widthFactor: 2,
                scale: 15,
                position: {
                    x: random.between(0, 100),
                    y: up ? 100 : 0,
                    z: random.between(10, 40),
                }
            })

        let absHeight = up ? -view.height : view.height;

        object.position.set(
            position.x, absHeight, position.z
        );

        object.userData.velocity = this.getVelocity();
        object.userData.respawnAt = view.height;

        return object;

    }

    private clone(object: THREE.Object3D): THREE.Object3D {

        const clone = this.setup(object.clone(), {
            scale: 8,
            widthFactor: 2,
            uvs: false,
            position: {
                x: random.between(0, 100),
                y: random.between(0, 100),
                z: random.between(1, 20),
            }
        })

        const height = clone.userData.meta.view.height;

        clone.position.y = -height
        clone.userData.velocity = this.getVelocity();
        clone.userData.respawnAt = height;

        return clone;

    }

    private getVelocity(): number {
        return random.between(2, 5);
    }

}
