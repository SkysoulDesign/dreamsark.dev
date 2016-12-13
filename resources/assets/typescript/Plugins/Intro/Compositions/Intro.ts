import { Composition } from "../Abstracts/Composition";
import { Animator } from "../Modules/Animator";
import { Tween } from "../Modules/Tween";
import { is } from "../../Helpers";
import { deg2rad } from "../Helpers";
import { Glow } from "../Effects/Glow";

const CountUp: any = require('countup.js');

/**
 * Intro Composition
 */
export class Intro extends Composition {

    parallex: boolean = true;
    mouse: boolean = false;
    mouseInverse: boolean = false;
    debrisCompleted: boolean = false;
    done: boolean = false;
    glow: Glow;
    counter: any = null;

    queue = {};

    get objects(): string[] {
        return [
            'main',
            'hexParticles',
            'ship',
            'debris',
            'star',
            'fx',
            'tunnel',
            'buttons',
            'cockpit',
            'flare',
            'protonBean',
            // 'test',
            // 'tunnel',
            // 'streak'
        ];
    }

    public stage(objects) {

        let {ship, main, hexParticles, star, tunnel, streak, plexus, galaxy, fx, buttons, protonBean} = objects;

        main.add(buttons);

        this.scene.add(main);
        this.scene.add(hexParticles);
        this.scene.add(ship);
        this.scene.add(star);

        // console.log(star);

        this.app.audio.play('ambient')

        protonBean.userData.position = ship.getObjectByName('logo').position;

        //-544.9718967856711
        //435.51185286729776
        //134.67318495564345

        /**
         * Queue Update
         */
        this.queue['ship'] = ship;
        this.queue['hexParticles'] = hexParticles;
        this.queue['star'] = star;
        this.queue['protonBean'] = protonBean;

        this.glow = new Glow(this.app['browser'])

        this.glow.uniforms.exposure.value = 0.3;
        this.glow.uniforms.colorRange.value = 0.95;

        this.app.mouse.ray(buttons.getObjectByName('start'), data => {

            // this.scene.remove(main);
            // this.scene.remove(tunnel);
            // this.scene.remove(ship);
            // this.scene.remove(hexParticles);
            // this.scene.remove(star);
            // this.done = true;

            // /**
            //  * Start new composition
            //  */
            // this.app.start('galaxy', {
            //     glow: this.glow,
            //     queue: this.queue
            // })

            this.start(objects);

        });

        this.app.mouse.ray(buttons.getObjectByName('skip'), data => {
            alert('skip')
        });

    }

    public start(objects) {

        let {ship, main, hexParticles, debris, star, streak, plexus, galaxy, fx, tunnel, cockpit, flare} = objects

        let original = [
            ship.position.clone(),
            main.position.clone()
        ];

        let logo = ship.getObjectByName('logo'),
            camera = this.camera,
            controls = this.app.controls.instance,
            endTunnel = false;

        /**
         * Transform ship
         */
        let animation = this.app.tween.animate({
            origin: {
                camera: this.camera.position,
            },
            target: {
                camera: {
                    x: 0, y: 0
                }
            },
            ease: Tween.EXPOINOUT,
            duration: 3,
            before: () => {
                this.parallex = false;
                ship.userData.transform(this.scene, this.queue, this.glow);
            },
            update: () => {
                return !ship.userData.transformDone;
            }
        })

        /**
         * Animate Camera back to center point
         */
        animation.then({
            origin: {
                particle: main.getObjectByName('smoke').userData.particle,
                camera: this.camera.position,
                power: 0
            },
            target: {
                power: 0.01,
                particle: {
                    count: 20,
                    size: 4,
                },
                camera: {
                    x: 0, y: 0
                }
            },
            duration: 5,
            ease: Tween.EXPOIN,
            before: () => {
                this.parallex = false;
                this.app.audio.play('takeOf');
                this.initTakeOf(main)
                ship.userData.taill.scale.set(5, .3, 1);
            },
            update: ({power}, time) => {

                if (this.app.audio.get('takeOf').timer.getElapsedTime() <= 12) {

                    this.camera.rotation.z = Math.random() * power.value;

                    return true;
                }

                setTimeout(() => {
                    delete this.queue['smoke'];
                }, 2000)

                this.camera.rotation.z = 0;

                return;

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
                glow: this.glow.uniforms
            },
            target: {
                taill: 2,
                decay: 5,
                booster: -3,
                speed: 5,
                ship: { z: 20 },
                glow: {
                    colorRange: {
                        value: 0.7
                    },
                    exposure: {
                        value: 0.5
                    }
                },
                main: {
                    y: -main.getObjectByName('background').userData.meta.size.height
                }
            },
            duration: .7,
            ease: Tween.EXPOIN,
            before: () => {
                this.app.renderer.setClearColor(0x18142b)
            },
            update: ({booster, speed, decay, taill}, completion, elapsed) => {

                let orb = ship.getObjectByName('orb');
                orb.scale.addScalar(1.5)
                orb.material.opacity -= 0.01;

                ship.userData.booster = booster.value;
                star.userData.speed = speed.value;
                star.material.opacity = speed.value > .8 ? .8 : speed.value < .2 ? .2 : speed.value;
                hexParticles.userData.decay = decay.value;

                // ship.userData.taill.visible = true;
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
                this.mouse = false;
            },
            after: () => {
                this.mouseInverse = true;
            },
            update({align}) {
                star.userData.align(align)
            }
        })

        /**
        * Cockpit
        */
        // animation.then({
        //     origin: {
        //         // camera: camera,
        //         transition: main.getObjectByName('transition'),
        //         cockpit: cockpit,
        //         ship: ship.position,
        //     },
        //     target: {
        //         // camera: {
        //         //     far: 15000,
        //         // },
        //         transition: {
        //             material: {
        //                 opacity: 0
        //             },
        //             position: { z: 600 }
        //         },
        //         ship: {
        //             z: 800
        //         },
        //         cockpit: {
        //             material: {
        //                 opacity: 1
        //             },
        //             position: {
        //                 z: 200
        //             }
        //         }
        //     },
        //     ease: Tween.EXPOINOUT,
        //     duration: 3,
        //     before: () => {
        //         this.scene.add(cockpit)

        //     },
        //     after: () => {
        //         this.scene.remove(main)
        //     },
        //     update: () => {
        //         // camera.updateProjectionMatrix();
        //     }

        // })

        /**
         * Align
         */
        animation.then({
            origin: {
                transition: main.getObjectByName('transition'),
            },
            target: {
                transition: {
                    material: {
                        opacity: 0
                    },
                    position: { z: 600 }
                }
            },
            ease: Tween.EXPOINOUT,
            duration: 3,
            before: () => {
                this.initCounter(objects);
            },
            after: () => {
                this.scene.remove(main)
            }
        })

        /**
         * Enter Tunnel
         */
        animation.then({
            origin: {
                camera: camera,
                tunnel: tunnel,
            },
            target: {
                camera: {
                    far: 50000
                },
                tunnel: {
                    position: {
                        z: -2000
                    },
                    material: {
                        opacity: 1
                    }
                }
            },
            ease: Tween.EXPOOUT,
            duration: 3,
            before: () => {
                this.scene.fog = <any>(new THREE.Fog(0x18142b, 4000, 5000));
                this.scene.add(tunnel);
                this.queue['tunnel'] = tunnel;
            },
            update: () => {

                this.camera.updateProjectionMatrix();

                if (this.counter.frameVal >= 1000000000) {
                    return this.stopCounter() || false;
                }

                return true;

            }
        })

        /**
         * Super Speed
         */
        // animation.then({
        //     origin: {
        //         taill: ship.userData.taill,
        //         uniforms: ship.userData.uniforms,
        //         position: ship.position,
        //         star: star.userData,
        //         flare: flare,
        //         power: 0,
        //         spin: 0,
        //     },
        //     target: {
        //         flare: {
        //             position: {
        //                 z: -500
        //             },
        //             scale: {
        //                 y: 50
        //             }
        //         },
        //         spin: 1,
        //         taill: {
        //             scale: {
        //                 x: 15, y: 1, z: 1
        //             },
        //             position: {
        //                 y: -400
        //             }
        //         },
        //         uniforms: {
        //             frequency: {
        //                 value: 10
        //             },
        //             waves: {
        //                 value: 2
        //             },
        //             warp: {
        //                 value: 5
        //             }
        //         },
        //         // position: {
        //         //     z: 5
        //         // },
        //         star: {
        //             speed: 25
        //         },
        //         power: 0.015,
        //     },
        //     ease: Tween.EXPOIN,
        //     duration: 2,
        //     before: () => {

        //         this.scene.add(flare)
        //         this.scene.add(fx);
        //         this.queue['fx'] = fx;

        //         setTimeout(() => { endTunnel = true }, 3000)

        //     },
        //     update: ({power, streak, spin}, time) => {
        //         camera.rotation.z += Math.sin(time) * power.value;
        //         ship.userData.taill.rotation.y += spin.value;
        //         fx.userData.uniforms.alpha.value = spin.value;
        //         return !endTunnel;
        //     }
        // })

        /**
         * Lock and warp
         */
        animation.then({
            origin: {
                logo: ship.getObjectByName('logo'),
                camera: camera,
                tunnel: tunnel.userData.controls,
                glow: this.glow.uniforms
            },
            target: {
                glow: {
                    exposure: {
                        value: 5
                    },
                    colorRange: {
                        value: .1
                    }
                },
                tunnel: {
                    waves: 0,
                    width: 0,
                    height: 0,
                    xSpeed: 0.00008,
                },
                // camera: {
                //     fov: 8,
                //     zoom: 0.1
                // },
                logo: {
                    position: { x: 0, y: 0, z: 0 },
                    rotation: { x: 0, y: 0 },
                    scale: { x: 0.001, y: 0.001, z: 0.001 },
                }
            },
            duration: 5,
            ease: Tween.CUBICIN,
            before: () => {

                setTimeout(() => {
                    document.querySelector('#fader')['style'].opacity = 1;
                }, 3000)

                this.mouse = false;
            },
            update: () => {

                // main.children.forEach(child => {

                //     child.position.z += 5;

                //     /**
                //      * Instance of group, as buttons no need to have opacity lowered
                //      */
                //     if (!(child instanceof THREE.Group))
                //         child.material.opacity = fade.value
                // })

                // tunnel.rotation.z += 1

                // fx.userData.uniforms.alpha.value = fade.value;

                camera.updateProjectionMatrix();

                // return true;

            },
            after: () => {
                // this.scene.remove(main)
                // this.scene.remove(fx)
                // delete this.queue['fx'];
            }
        })

        /**
         * Enter plexus
         */
        animation.then(() => {

            // this.scene.remove(tunnel);
            this.scene.remove(ship);
            this.scene.remove(hexParticles);
            this.scene.remove(star);
            this.done = true;

            /**
             * Start new composition
             */
            this.app.start('galaxy', {
                glow: this.glow,
                tunnel: tunnel,
                queue: this.queue
            });

        })

    }

    public update(objects, time, delta) {

        // this.uniforms.cameraViewMatrix.value = this.app.camera.modelViewMatrix;

        // this.uniforms.viewVector.value.subVectors(this.camera.position, this.mesh.position);

        let mouse = this.app.mouse,
            camera = this.camera;

        let {hexParticles, ship, galaxy} = objects;

        for (let property in this.queue) {
            if (this.queue[property].userData.update(time, delta)) {

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

        this.glow.render(this.app)
        // this.render();

        return this.done;

    }

    private stopCounter() {
        this.counter.pauseResume();
        document.querySelector('#counter')['style'].opacity = 0;
        this.app.mouse.stateQueue = [];
    }

    private initCounter({ship, star, tunnel}) {

        const options = {
            useEasing: true,
            useGrouping: true,
            separator: ',',
            decimal: '.',
            prefix: '',
            suffix: ''
        },
            camera = this.app.camera

        document.querySelector('#counter')['style'].opacity = 1;

        let total = 1000000000;

        this.counter = new CountUp('counter', 1, total, 0, 600, options);
        this.counter.start();

        let animation,
            original = {
                cameraZoom: camera.zoom,
                duration: this.counter.duration,
                shipPosition: ship.position.z,
                starSpeed: star.userData.speed,
                tunnelHeight: tunnel.userData.controls.height,
                tunnelWidth: tunnel.userData.controls.width,
                tunnelSpeed: tunnel.userData.controls.speed,
                taill: {
                    scale: {
                        x: ship.userData.taill.scale.x,
                        y: ship.userData.taill.scale.y,
                        z: ship.userData.taill.scale.z
                    },
                    position: {
                        y: ship.userData.taill.position.y
                    }
                },
                uniforms: {
                    frequency: {
                        value: ship.userData.uniforms.frequency.value
                    },
                    waves: {
                        value: ship.userData.uniforms.waves.value
                    },
                    warp: {
                        value: ship.userData.uniforms.warp.value
                    }
                }
            };

        this.app.mouse.hold(() => {

            animation = this.app.tween.animate({
                origin: {
                    camera, ship,
                    counter: this.counter,
                    star: star.userData,
                    tunnel: tunnel.userData.controls,
                    taill: ship.userData.taill,
                    uniforms: ship.userData.uniforms,
                    power: 0
                },
                target: {
                    ship: {
                        position: {
                            z: 300
                        },
                    },
                    camera: {
                        zoom: 0.3,
                    },
                    counter: {
                        duration: original.duration * 0.1
                    },
                    star: {
                        speed: original.starSpeed * 2
                    },
                    tunnel: {
                        height: 0,
                        width: 0
                    },
                    taill: {
                        scale: { x: 15, y: 1, z: 1 },
                        position: { y: -450 }
                    },
                    uniforms: {
                        frequency: { value: 10 },
                        waves: { value: 2 },
                        warp: { value: 5 }
                    },
                    power: 0.015,
                },
                duration: 1,
                ease: Tween.EXPOIN,
                before: () => {
                    setTimeout(() => tunnel.userData.controls.speed = original.tunnelSpeed * 2, 1000)
                },
                update: ({power}, time) => {
                    camera.rotation.z += Math.sin(time) * power.value
                    camera.updateProjectionMatrix();
                    return this.app.mouse.isHolding
                }
            });

        })

        this.app.mouse.release(() => {

            if (animation)
                animation.then({
                    origin: {
                        ship: ship,
                        camera: camera,
                        counter: this.counter,
                        star: star.userData,
                        tunnel: tunnel.userData.controls,
                        taill: ship.userData.taill,
                        uniforms: ship.userData.uniforms
                    },
                    target: {
                        ship: {
                            position: {
                                z: original.shipPosition
                            },
                        },
                        camera: {
                            zoom: original.cameraZoom,
                            rotation: { z: 0 }
                        },
                        counter: {
                            duration: original.duration
                        },
                        star: {
                            speed: original.starSpeed
                        },
                        tunnel: {
                            height: original.tunnelHeight,
                            width: original.tunnelWidth
                        },
                        taill: {
                            scale: {
                                x: original.taill.scale.x,
                                y: original.taill.scale.y,
                                z: original.taill.scale.z
                            },
                            position: {
                                y: original.taill.position.y
                            }
                        },
                        uniforms: {
                            frequency: {
                                value: original.uniforms.frequency.value
                            },
                            waves: {
                                value: original.uniforms.waves.value
                            },
                            warp: {
                                value: original.uniforms.warp.value
                            }
                        }
                    },
                    ease: Tween.EXPOOUT,
                    duration: 1,
                    before: () => {
                        tunnel.userData.controls.speed = original.tunnelSpeed;
                        this.counter.update(
                            this.counter.frameVal * 2
                        );
                    },
                    update: () => {
                        camera.updateProjectionMatrix();
                    }
                });
        })
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

    public initTakeOf(main: THREE.Group) {
        this.queue['smoke'] = main;
    }

}