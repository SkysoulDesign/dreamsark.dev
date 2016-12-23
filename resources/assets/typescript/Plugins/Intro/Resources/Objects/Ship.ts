import { ObjectInterface } from "../../Interfaces/ObjectInterface";
import { Forgable } from "../../Abstracts/Forgable";
import { random, deg2rad, configureTexture } from "../../Helpers";
import { Tween } from "../../Modules/Tween";

// require('../../../../../../../public/js/GPUParticleSystem.js');

const Proton: any = require('../../../../../../../public/js/three.proton.js');

/**
 * Ship
 */
export class Ship extends Forgable implements ObjectInterface {

    private maps = []

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

        this.maps = material.userData;

        let group = new THREE.Group(),
            ship = this.forge('ship', material, {
                geometry: geometry,
                scale: 15,
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
                    return new THREE.PlaneGeometry(width, height, 5, 5)
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

        streak.scale.set(1, .1, 1);
        streak.position.setY(-40);

        ship.add(streak);

        let tunnedMaterial = ship['material'].clone();
            tunnedMaterial.map = configureTexture(this.sprite, material.userData, 'ship-tunned');

        group.add(ship);

        console.log(group)

        for (let i = 0; i <= 5; i++) {
            clones.push(this.clone(ship));
        }

        clones.forEach(clone => {
            clone.material = tunnedMaterial;
            group.add(clone)
        });

        ship.name = 'logo';
        ship.visible = true;

        const dreamsark = <THREE.Mesh>this.forge('logo', material, {
            scale: 18,
            position: {
                x: 50, y: 45, z: 65
            }
        });

        dreamsark.name = 'dreamsark';
        dreamsark.visible = false;

        group.add(dreamsark);

        streak.visible = false;

        group.userData = {
            // taill: streak,
            // uniforms: streak.material['userData'].uniforms,
            booster: 1,
            update: this.update.bind(this, group),
            transform: this.transform.bind(this, group, material),
            transformDone: false,
            go: false,
            proton: null,
            emitter: null,
            swap: this.swap.bind(this, ship, tunnedMaterial)
        }

        return group

    }

    private swap(ship: THREE.Mesh, material) {
        ship.material['map'] = material.map
    }

    public initProtonOnClones(group, clones, protonBean) {

        group.userData.proton = protonBean.userData.proton;

        let life = new Proton.Life(0.4, .3),
            body = new Proton.Body(protonBean.userData.sprite),
            radius = new Proton.Radius(20, 1),
            velocity = new Proton.V(45, new Proton.Vector3D(0, -50, 0), 10),
            mass = new Proton.Mass(1),
            rate = new Proton.Rate(new Proton.Span(3, 7), new Proton.Span(.001, .002)),
            scale = new Proton.Scale([1, .9], [.8, 1]);

        clones.forEach((clone: THREE.Mesh) => {

            let emitter = new Proton.Emitter();

            //setRate
            emitter.rate = rate;

            // emitter.addInitialize(new Proton.Position(new Proton.PointZone(0, -32, 7)));
            emitter.addInitialize(mass);
            emitter.addInitialize(life);
            emitter.addInitialize(body);
            emitter.addInitialize(radius);
            emitter.addInitialize(velocity);

            emitter.addBehaviour(scale);

            emitter.emit();

            clone.userData.update = () => {
                emitter.p.x = clone.position.x
                emitter.p.y = clone.position.y
                emitter.p.z = clone.position.z
            }

            protonBean.userData.proton.addEmitter(emitter);

        })

    }

    public createProtons(protonBean) {

        let proton = protonBean.userData.proton;

        let life = new Proton.Life(0.5, 1),
            body = new Proton.Body(protonBean.userData.sprite),
            radius = new Proton.Radius(0, 0),
            velocity = new Proton.V([8, 15], new Proton.Vector3D(0, 0, -100), 0),
            mass = new Proton.Mass(1),
            rate = new Proton.Rate(new Proton.Span(5, 7), 0),
            scale = new Proton.Scale([1, .9], [.8, 1]),
            colorBehaviour = new Proton.Color(new THREE.Color('#4F1500'), new THREE.Color('#0029FF')),
            alpha = new Proton.Alpha(1);

        let emitter = new Proton.Emitter();

        velocity.dir.z = -10;
        emitter.p.z = 50;

        console.log(emitter)

        //setRate
        emitter.rate = rate;

        // emitter.addInitialize(new Proton.Position(new Proton.PointZone(0, -32, 7)));
        emitter.addInitialize(mass);
        emitter.addInitialize(life);
        emitter.addInitialize(body);
        emitter.addInitialize(radius);
        emitter.addInitialize(velocity);
        // emitter.addBehaviour(colorBehaviour);
        emitter.addBehaviour(new Proton.Color('random'));
        emitter.addBehaviour(alpha);
        // emitter.addBehaviour(new Proton.RandomDrift(10, 10, .05));
        // emitter.p.x = 50
        // emitter.p.y = -50
        emitter.emit();

        emitter.userData = {
            radius: radius,
            alpha: alpha,
            velocity: velocity,
            scale: 0,
            speed: .5,
            offsetY: -25,
            update: time => {
                emitter.p.x = Math.sin(time * emitter.userData.speed) * emitter.userData.scale
                emitter.p.y = Math.cos(time * emitter.userData.speed) * emitter.userData.scale + emitter.userData.offsetY
            }
        }

        proton.addEmitter(emitter);

        return emitter;

    }

    public transform(group, material: any, protonBean, scene: THREE.Scene, queue) {

        let emitter = this.createProtons(protonBean),
            dreamsark = group.getObjectByName('dreamsark'),
            logo = group.getObjectByName('logo');

        let animation = this.app.tween.animate({
            origin: {
                radius: emitter.userData.radius.radius,
                emitter: emitter.userData,
                logo: logo,
            },
            target: {
                logo: {
                    rotation: {
                        y: Math.PI * 10,
                    }
                },
                // emitter: {
                //     offsetY: 8,
                //     scale: 8,
                // },
                radius: {
                    a: 0,
                    b: 1
                }
            },
            ease: Tween.EXPOIN,
            duration: 5
        });

        // animation.then({
        //     origin: {
        //         radius: emitter.userData.radius.radius,
        //     },
        //     target: {
        //         radius: {
        //             a: 30,
        //             b: 40
        //         }
        //     },
        //     ease: Tween.CIRCIN,
        //     duration: 1,
        //     after: () => {
        //         dreamsark.visible = false;
        //         logo.visible = true;
        //     }
        // });

        animation.then({
            origin: {
                alpha: emitter.userData.alpha.a,
                radius: emitter.userData.radius.radius,
                emitter: emitter.userData
            },
            target: {
                emitter: {
                    offsetY: -10,
                    // scale: 60,
                    speed: 0.04,
                    velocity: {
                        dir: {
                            z: -100,
                            y: 50
                        }
                    }
                },
                radius: {
                    a: 120,
                    b: 100,
                },
                alpha: {
                    a: 0.01,
                    b: 0.009,
                }
            },
            ease: Tween.EXPOOUT,
            duration: 1,
            before: () => {

                setTimeout(() => group.userData.swap(), 100)

                /**
                 * Rotate Logo
                 */
                this.app.tween.animate({
                    origin: {
                        logo: logo,
                    },
                    target: {
                        logo: {
                            rotation: {
                                y: deg2rad(360 * 10),
                            }
                        }
                    },
                    ease: Tween.CIRCOUT,
                    duration: 10,
                    before: () => {
                        group.userData.transformDone = true;
                    },
                    update() {
                        return !group.userData.go;
                    }
                }).then({
                    origin: {
                        alpha: emitter.userData.alpha.a,
                        emitter: emitter.userData,
                        radius: emitter.userData.radius.radius,
                    },
                    target: {
                        emitter: {
                            // scale: 200,
                            velocity: {
                                dir: {
                                    z: 100,
                                    y: -50
                                }
                            }
                        },
                        radius: {
                            a: 20,
                            b: 30,
                        },
                        alpha: { a: 1, b: 1 }
                    },
                    ease: Tween.EXPOIN,
                    duration: .2
                }).then(() => {
                    group.userData.emitter.stopEmit()
                    setTimeout(() => {
                        group.userData.proton.removeEmitter(group.userData.emitter);
                        group.userData.proton = null
                    }, 1000)
                });

            }

        });

        group.userData.proton = protonBean.userData.proton;
        group.userData.emitter = emitter;

    }

    public update(object: THREE.Object3D, time, delta) {

        // object['userData'].uniforms.angle.value += object['userData'].uniforms.frequency.value;
        // object['userData'].taill.rotation.y += .9;

        if (object['userData'].proton) {
            object['userData'].proton.update();
            object['userData'].emitter.userData.update(time);
        }

        // object['userData'].streak.scale.setX(Math.sin(time));

        object.children.forEach((child, i) => {

            if (child.name === 'logo' || child.name === 'dreamsark' || child.name === 'orb') return;

            child.children[0].scale.set(Math.abs(Math.sin(time) * .2) + 1, .05, 1)

            if (child.position.y > child.userData.respawnAt) {
                this.respawn(child)
            }

            if (child.position.y < -child.userData.respawnAt) {
                this.respawn(child, false)
            }

            child.position.y += child.userData.velocity * object.userData.booster;

            // child.userData.update()

        })


        // console.log(this.engine.world.bodies[0].position.y)

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
                scale: 2,
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

    private clone(object: THREE.Mesh | THREE.Object3D): THREE.Object3D {

        object['material'].fog = true

        const clone = this.setup(object.clone(), {
            scale: 2,
            // widthFactor: 2,
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