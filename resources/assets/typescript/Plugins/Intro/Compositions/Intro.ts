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
    queue = {};

    get objects(): string[] {
        return [
            'main',
            'hexParticles',
            'ship',
            'debris',
            'star',
            // 'tunnel',
            // 'streak'
        ];
    }

    public setup() {
        // console.log('hi')
    }

    public stage(objects) {

        let {ship, main, hexParticles, star, tunnel, streak} = objects;

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

        this.scene.add(main);
        this.scene.add(hexParticles);

        this.scene.add(ship);
        this.scene.add(star);
        // this.scene.add(streak);
        // this.scene.add(tunnel);

        // this.camera

        /**
         * Queue Update
         */
        this.queue['ship'] = ship;
        this.queue['hexParticles'] = hexParticles;
        this.queue['star'] = star;


        this.app.mouse.click(this.start.bind(this, objects))

        // let gui = new dat.GUI();

        // gui.add(this.camera.position, 'x', -2000, 2000);
        // gui.add(this.camera.position, 'y', -2000, 2000);
        // gui.add(this.camera.position, 'z', -2000, 2000);

        // gui.add(this.camera.rotation, 'x', -Math.PI * 5, Math.PI * 5).step(0.1);
        // gui.add(this.camera.rotation, 'y', -Math.PI * 5, Math.PI * 5).step(0.1);
        // gui.add(this.camera.rotation, 'z', -Math.PI * 5, Math.PI * 5).step(0.1);

        // console.log(hexParticles)

        // Animator
        //     .from(actor)
        //     .play('idle')
        //     .play('lookAround');
        //
        // Animator
        //     .from(artist3d)
        //     .play('idle')
        //     .play('lookAround');

    }

    public start({ship, main, hexParticles, debris, star, streak}) {

        let original = [
            ship.position.clone(),
            main.position.clone()
        ]

        let logo = ship.getObjectByName('logo'),
            camera = this.camera;

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
                taill: 3,
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
                // streak: streak.material['userData'].uniforms,
                position: ship.position,
                star: star.userData,
                power: 0
            },
            target: {
                // streak: {
                //     alpha: {
                //         value: 1
                //     },
                //     frequency: {
                //         value: 3
                //     },
                //     waves: {
                //         value: 8
                //     },
                //     warp: {
                //         value: 8
                //     }
                // },
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
                this.scene.add(streak)
                this.queue['streak'] = streak;
            },
            update: ({power, streak}, time) => {
                camera.rotation.z += Math.sin(time) * power.value;

                // streak.material.uniforms.alpha.value = streak.value
                // streak.material.uniforms.waves.value = streak.value * 5
                // streak.material.uniforms.warp.value = streak.value * 5

                return true;
            }
        })


    }

    public update(objects, time, delta) {

        let mouse = this.app.mouse,
            camera = this.camera;

        let {hexParticles, ship} = objects;

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

    public hexParticlesDone({hexParticles}) {
        this.scene.remove(hexParticles);
    }

    public debrisDone({debris}) {
        this.scene.remove(debris);
        this.debrisCompleted = true;
    }

    public initDebris(debris: THREE.Object3D) {
        this.scene.add(debris);
        this.queue['debris'] = debris;
    }

}