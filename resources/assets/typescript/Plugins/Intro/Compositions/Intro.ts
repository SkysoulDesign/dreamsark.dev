import { Composition } from "../Abstracts/Composition";
import { Animator } from "../Modules/Animator";
import { Tween } from "../Modules/Tween";
import { is } from "../../Helpers";
import { deg2rad } from "../Helpers";

/**
 * Intro Composition
 */
export class Intro extends Composition {

    parallex: boolean = true;
    mouse: boolean = false;
    mouseInverse: boolean = false;
    debrisCompleted: boolean = false;
    tutorialDone: boolean = false;
    open: boolean = false;
    queue = {};

    get objects(): string[] {
        return [
            'main',
            'hexParticles',
            'ship',
            'debris',
            'star',
            'plexus',
            'galaxy',
            'fx',
            'buttons'
            // 'tunnel',
            // 'streak'
        ];
    }

    public setup() {
        // console.log('hi')
    }

    public stage(objects) {

        let {ship, main, hexParticles, star, tunnel, streak, plexus, galaxy, fx, buttons} = objects;

        // setTimeout(() => {
        //     this.app.loader.load('/models/Actor.json').then(function (a) {
        //         console.log('what next', a)
        //     })
        // }, 5000)

        // artist3d.position.x = 30;

        // this.configure(ship.getChildrenByName('background'), {
        //     scale: 30,
        //     position: {
        //         x: 50,
        //         y: 50,
        //         z: 30
        //     }
        // })

        // this.scene.add(plexus);
        // this.scene.add(galaxy);

        main.add(buttons);

        this.scene.add(main);
        this.scene.add(hexParticles);
        this.scene.add(ship);
        this.scene.add(star);

        console.log(main.getObjectByName('smoke').userData.animations)


        // console.log(ship.getObjectByName('logo'));

        // this.scene.add(plexus);
        // this.scene.add(tunnel);

        // this.camera

        Animator
            .from(main.getObjectByName('smoke'))
            .play('smoke')

        /**
         * Queue Update
         */
        this.queue['ship'] = ship;
        this.queue['hexParticles'] = hexParticles;
        this.queue['star'] = star;

        this.app.mouse.ray(buttons.getObjectByName('start'), data => {
            this.start(objects);
        });

        this.app.mouse.ray(buttons.getObjectByName('skip'), data => {
            alert('skip')
        });

        // console.log(plexus)

        // this.app.mouse.ray(plexus, data => {
        //     console.log('foi')
        // });

        // console.log(this.app.raycaster)

        // this.queue['galaxy'] = galaxy;

        // this.camera.far = 500000;
        // this.camera.fov = 8;
        // this.camera.zoom = 0.1
        // this.camera.updateProjectionMatrix();

    }

    public start(objects) {

        let {ship, main, hexParticles, debris, star, streak, plexus, galaxy, fx} = objects

        let original = [
            ship.position.clone(),
            main.position.clone()
        ]

        let logo = ship.getObjectByName('logo'),
            camera = this.camera,
            controls = this.app.controls.instance,
            endTunnel = false;

        /**
         * Animate Camera back to center point
         */
        let animation = this.app.tween.animate({
            origin: this.camera.position,
            target: {
                x: 0, y: 0
            },
            duration: 1,
            ease: Tween.SINEINOUT,
            before: () => {
                this.parallex = false;
            }
        })

        /**
         * Animate spaceship up
         */
        animation.then({
            origin: {
                ship: logo.position,
                main: main.position,
                booster: ship.userData.booster,
                speed: star.userData.speed,
                move: 0,
                decay: 0,
                taill: 0,
            },
            target: {
                taill: 2,
                decay: 5,
                booster: -3,
                speed: 2.5,
                ship: { z: 20 },
                main: {
                    y: -main.getObjectByName('background').userData.meta.size.height
                }
            },
            duration: 2,
            ease: Tween.EXPOIN,
            before: () => {

            },
            update: ({booster, speed, decay, taill}, completion, elapsed) => {

                ship.userData.booster = booster.value;
                star.userData.speed = speed.value;
                star.material.opacity = speed.value > .8 ? .8 : speed.value < .2 ? .2 : speed.value;
                hexParticles.userData.decay = decay.value;

                ship.userData.taill.visible = true;
                ship.userData.taill.scale.set(taill.value, .3, 1);

                if (taill.completion < 95)
                    ship.userData.taill.position.y -= taill.value;

                return !this.debrisCompleted;

            },
            after: () => {
                this.mouse = true;
                this.initDebris(debris);
            }
        });

        /**
         * Lets go to tunnel
         */
        animation.then({
            origin: {
                rotation: ship.rotation,
                position: ship.position,
                align: 0,
                r: star.rotation,
            },
            target: {
                r: {
                    x: -deg2rad(90)
                },
                align: 100,
                position: {
                    z: -300,
                    x: 0,
                    y: 0
                },
                rotation: {
                    x: -deg2rad(90),
                    y: deg2rad(360)
                }
            },
            ease: Tween.QUADINOUT,
            duration: 5,
            before() {
                star.userData.vortexEnabled = true;
            },
            after: () => {
                this.mouseInverse = true;
            },
            update({align}, time, completion) {
                star.userData.align(align)
            }
        })

        /**
         * Momentum
         */
        animation.then({
            origin: {
                position: ship.position,
                star: star.userData,
            },
            target: {
                position: {
                    z: 0
                },
                star: {
                    speed: star.userData.speed * 30
                },
            },
            ease: Tween.EXPOINOUT,
            duration: 3
        })

        /**
         * Super Speed
         */
        animation.then({
            origin: {
                taill: ship.userData.taill,
                uniforms: ship.userData.uniforms,
                position: ship.position,
                star: star.userData,
                power: 0,
                spin: 0,
            },
            target: {
                spin: 1,
                taill: {
                    scale: {
                        x: 15, y: 1, z: 1
                    },
                    position: {
                        y: -400
                    }

                },
                uniforms: {
                    frequency: {
                        value: 10
                    },
                    waves: {
                        value: 2
                    },
                    warp: {
                        value: 5
                    }
                },
                position: {
                    z: 5
                },
                star: {
                    speed: 25
                },
                power: 0.015
            },
            ease: Tween.EXPOIN,
            duration: 2,
            before: () => {
                // this.scene.add(streak)
                // this.queue['streak'] = streak;
                this.scene.add(fx);
                this.queue['fx'] = fx;

                setTimeout(() => {
                    endTunnel = true
                }, 10000)

            },
            update: ({power, streak, spin}, time) => {
                camera.rotation.z += Math.sin(time) * power.value;
                ship.userData.taill.rotation.y += spin.value;
                fx.userData.uniforms.alpha.value = spin.value;
                return !endTunnel;
            }
        })

        /**
         * Lock and warp
         */
        animation.then({
            origin: {
                logo: ship.getObjectByName('logo'),
                camera: camera,
                fade: 1,
            },
            target: {
                camera: {
                    far: 500000,
                    fov: 8,
                    zoom: 0.1
                },
                fade: 0,
                logo: {
                    position: { x: 0, y: 0, z: 0 },
                    rotation: { x: 0, y: 0 },
                    scale: { x: 0.001, y: 0.001, z: 0.001 },
                }
            },
            duration: 5,
            ease: Tween.CUBICIN,
            before: () => {
                this.mouse = false;
            },
            update: ({fade}) => {

                main.children.forEach(child => {

                    child.position.z += 5;

                    /**
                     * Instance of group, as buttons no need to have opacity lowered
                     */
                    if (!(child instanceof THREE.Group))
                        child.material.opacity = fade.value
                })

                fx.userData.uniforms.alpha.value = fade.value;

                camera.updateProjectionMatrix();

            },
            after: () => {
                this.scene.remove(main)
                this.scene.remove(fx)

                delete this.queue['fx'];
            }
        })

        // this.camera.far = 500000;
        // this.camera.fov= 8;
        // this.camera.zoom = 0.1
        // this.camera.updateProjectionMatrix();

        /**
         * Enter plexus
         */
        animation.then({
            origin: {
                depth: plexus.position.z,
                star: star.userData
            },
            target: {
                star: {
                    speed: 1
                },
                depth: 0
            },
            duration: 10,
            ease: Tween.EXPOOUT,
            before: () => {

                setTimeout(this.initTutorial, 5000);

                star.userData.completed = true;
                this.queue['plexus'] = plexus;
                this.scene.add(plexus);
                this.scene.add(galaxy);

            },
            update({depth}) {

                plexus.position.setZ(depth.value);
                galaxy.position.setZ(depth.value);

                return this.tutorialDone;

            },
            after: () => {

                this.scene.remove(ship);
                this.scene.remove(hexParticles);
                this.scene.remove(star);
                controls.enabled = true;

                let action = (object, intersects) => {
                    if (!this.open)
                        this.showProject(object);
                }

                plexus.userData.data.nodesBag.forEach(node => {
                    this.app.mouse.ray(node.node, action);
                })

            }
        })

    }

    public update(objects, time, delta) {

        let mouse = this.app.mouse,
            camera = this.camera;

        let {hexParticles, ship, galaxy} = objects;

        // galaxy.getObjectByName('dirty').quaternion.copy(camera.quaternion);

        for (let property in this.queue) {
            if (this.queue[property].userData.update(time)) {

                if (is.Function(this[`${property}Done`])) {
                    this[`${property}Done`](objects)
                }

                delete this.queue[property];

            }
        }

        /**
        * Parallex
        */
        if (this.parallex) {
            camera.position.set(
                mouse.normalized.x * 20, mouse.normalized.y * 20, 500
            )
        }

        /**
        * Logo Follow Mouse
        */
        if (this.mouse) {

            let logo = ship.getObjectByName('logo');

            logo.position.x = mouse.screen.x * .1;
            logo.position[this.mouseInverse ? 'z' : 'y'] = -mouse.screen.y * .1;

            if (this.mouseInverse) {
                logo.rotation.x = deg2rad(mouse.screen.y * .1) / Math.PI
                logo.rotation.y = -deg2rad(mouse.screen.x * .1) / Math.PI
            }

        }

    }

    public hexParticlesDone({ hexParticles }) {
        this.scene.remove(hexParticles);
    }

    public debrisDone({ debris }) {
        this.scene.remove(debris);
        this.debrisCompleted = true;
    }

    public initDebris(debris: THREE.Object3D) {
        this.scene.add(debris);
        this.queue['debris'] = debris;
    }

    public initTutorial() {

        let element = document.querySelector('#tutorial');
        element['style'].display = 'flex';

        let canvas = document.querySelector('canvas');
        canvas['style'].backgroundColor = 'black';

        element.getElementsByTagName('button')[0].addEventListener('click', event => {

            this.tutorialDone = true;
            element['style'].display = 'none';

        }, false)

    }

    public showProject(object) {

        let element = document.querySelector('#overlay'),
            controls = this.app.controls.instance;

        controls.enabled = false;
        this.open = true;

        let original = this.camera.clone(),
            target = controls.target.clone();

        this.camera.moveTo(object, () => {

            element['style'].display = 'flex';

            element.getElementsByClassName('button')[0].addEventListener('click', event => {
                element['style'].display = 'none';

                this.camera.moveTo(original, () => {
                    controls.target.copy(target)
                    this.open = false;
                    controls.enabled = true;
                })

            }, false);

            // controls.target.copy(object.position)

        })

    }

}