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
    distance: number = 1000000000;

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

        this.scene.add(hexParticles);
        this.scene.add(ship);
        this.scene.add(star);
        this.scene.add(main);

        console.log(this.scene);

        document.addEventListener("keydown", function (e) {
            if (e.keyCode === 32)
                document.documentElement.webkitRequestFullScreen()
        }, false);

        // ship.userData.initProtonOnClones(protonBean)

        // console.log(star);
        this.app.audio.play('ambient')

        /**
         * Queue Update
         */
        this.queue['ship'] = ship;
        this.queue['hexParticles'] = hexParticles;
        this.queue['star'] = star;

        this.glow = new Glow(this.app['browser'])

        this.glow.uniforms.exposure.value = 0.3;
        this.glow.uniforms.colorRange.value = 0.95;

        this.app.mouse.ray(buttons.getObjectByName('start'), data => {

            // this.scene.remove(tunnel);
            // this.scene.remove(main);
            // this.scene.remove(ship);
            // this.scene.remove(hexParticles);
            // this.scene.remove(star);
            // this.done = true;

            // protonBean.userData.emitter.stopEmit();

            // /**
            //  * Start new composition
            //  */
            // this.app.start('galaxy', {
            //     glow: this.glow,
            //     tunnel: tunnel,
            //     queue: this.queue,
            //     protonBean: protonBean
            // });

            this.start(objects);

        });

        this.app.mouse.ray(buttons.getObjectByName('skip'), data => {
            alert('skip')
        });

    }

    public start(objects) {

        let {ship, main, hexParticles, debris, star, streak, plexus, galaxy, fx, tunnel, cockpit, flare, protonBean} = objects

        let original = [
            ship.position.clone(),
            main.position.clone()
        ];

        let logo = ship.getObjectByName('logo'),
            camera = this.camera,
            controls = this.app.controls.instance,
            endTunnel = false,
            vignette = document.querySelector('#vignette');

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
                ship.userData.transform(protonBean, this.scene, this.queue, this.glow);
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
                // ship.userData.taill.scale.set(5, .3, 1);
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
                // taill: 0,
                glow: this.glow.uniforms

            },
            target: {
                // taill: 2,
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
                ship.userData.go = true;
                protonBean.userData.emitter.rate.numPan.a = 10
                protonBean.userData.emitter.rate.numPan.b = 15
                protonBean.userData.object = ship.getObjectByName('logo');
                this.queue['protonBean'] = protonBean;
                protonBean.userData.proton.addEmitter(protonBean.userData.emitter)
                protonBean.userData.emitter.emit()
                this.app.renderer.setClearColor(0x18142b)
            },
            update: ({booster, speed, decay}, completion, elapsed) => {

                // let orb = ship.getObjectByName('orb');
                // orb.scale.addScalar(1.5)
                // orb.material.opacity -= 0.01;

                ship.userData.booster = booster.value;
                star.userData.speed = speed.value;
                star.material.opacity = speed.value > .8 ? .8 : speed.value < .2 ? .2 : speed.value;
                hexParticles.userData.decay = decay.value;

                // ship.userData.taill.visible = true;
                // ship.userData.taill.scale.set(taill.value, .3, 1);

                // if (taill.completion < 95)
                // ship.userData.taill.position.y -= taill.value;

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
                protonForce: protonBean.userData.emitter.behaviours[0].force,
                protonVelocity: protonBean.userData.emitter.initializes[5].dir,
                protonPosition: protonBean.userData,
            },
            target: {
                protonForce: {
                    z: 5000,
                    y: 0
                },
                protonVelocity: {
                    y: 0
                },
                protonPosition: {
                    ajust: 0
                },
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
            duration: 2,
            before() {
                star.userData.vortexEnabled = true;
                this.mouse = false;

            },
            after: () => {
                this.mouseInverse = true;
                protonBean.userData.inverse = true;
            },
            update({align}) {
                star.userData.align(align)
            }
        })

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
            duration: 1,
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
            duration: 2,
            before: () => {
                this.scene.fog = <any>(new THREE.Fog(0x18142b, 4000, 5000));
                this.scene.add(tunnel);
                this.queue['tunnel'] = tunnel;

                vignette['style'].opacity = 0;

                setTimeout(() => {
                    vignette['style'].background = 'radial-gradient(ellipse, transparent 65%, #e4ff00 100%)';
                    vignette['style'].opacity = 0.16;
                }, 2000);

            },
            update: () => {

                this.camera.updateProjectionMatrix();

                if (this.counter.frameVal >= this.distance) {
                    return this.stopCounter() || false;
                }

                return true;

            }
        })

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

            vignette['style'].opacity = 0;

            setTimeout(() => {
                vignette['style'].background = 'radial-gradient(ellipse, transparent 65%, #88341b 100%)';
            }, 2000);

            /**
             * Start new composition
             */
            this.app.start('galaxy', {
                glow: this.glow,
                tunnel: tunnel,
                queue: this.queue,
                protonBean: protonBean
            });

        })

    }

    public update(objects, time, delta) {

        // this.uniforms.cameraViewMatrix.value = this.app.camera.modelViewMatrix;

        // this.uniforms.viewVector.value.subVectors(this.camera.position, this.mesh.position);

        let mouse = this.app.mouse,
            camera = this.camera;

        let {hexParticles, ship, galaxy, protonBean} = objects;

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

            let logo = ship.getObjectByName('logo'),
                axis = this.mouseInverse ? 'z' : 'y';

            logo.position.x = mouse.screen.x * .15;
            logo.position[axis] = -mouse.screen.y * .15;

            let customMouseY = mouse.screen.y;

            if (customMouseY <= 800) {
                customMouseY = 800;
            }

            logo.rotation.y = -Math.atan2(customMouseY, mouse.screen.x) - Math.PI / 2;

            // if (this.mouseInverse) {

            //     logo.rotation.x = deg2rad(mouse.screen.y * .1) / Math.PI
            //     logo.rotation.y = -deg2rad(mouse.screen.x * .1) / Math.PI

            // }

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

    private initCounter({ship, star, tunnel, protonBean}) {

        const options = {
            useEasing: true,
            useGrouping: true,
            separator: ',',
            decimal: '.',
            prefix: '',
            suffix: ' km/h'
        },
            camera = this.app.camera,
            logo = ship.getObjectByName('logo')

        document.querySelector('#counter')['style'].opacity = 1;

        this.counter = new CountUp('counter', 1, this.distance, 0, 600, options);
        this.counter.start();

        let animation,
            original = {
                cameraZoom: camera.zoom,
                duration: this.counter.duration,
                logoPosition: logo.position.y,
                starSpeed: star.userData.speed,
                tunnelHeight: tunnel.userData.controls.height,
                tunnelWidth: tunnel.userData.controls.width,
                tunnelSpeed: tunnel.userData.controls.speed,
                protonOffset: protonBean.userData.offset,
                protonMass: {
                    a: protonBean.userData.emitter.initializes[1].massPan.a,
                    b: protonBean.userData.emitter.initializes[1].massPan.b,
                },
                protonRadius: {
                    a: protonBean.userData.emitter.initializes[4].radius.a,
                    b: protonBean.userData.emitter.initializes[4].radius.b,
                },
                protonColors: {
                    a: {
                        r: protonBean.userData.colors.a.r,
                        g: protonBean.userData.colors.a.g,
                        b: protonBean.userData.colors.a.b,
                    },
                    b: {
                        r: protonBean.userData.colors.b.r,
                        g: protonBean.userData.colors.b.g,
                        b: protonBean.userData.colors.b.b,
                    }
                }
                // taill: {
                //     scale: {
                //         x: logo.userData.taill.scale.x,
                //         y: logo.userData.taill.scale.y,
                //         z: logo.userData.taill.scale.z
                //     },
                //     position: {
                //         y: logo.userData.taill.position.y
                //     }
                // },
                // uniforms: {
                //     frequency: {
                //         value: logo.userData.uniforms.frequency.value
                //     },
                //     waves: {
                //         value: logo.userData.uniforms.waves.value
                //     },
                //     warp: {
                //         value: logo.userData.uniforms.warp.value
                //     }
                // }
            };

        this.app.mouse.hold(() => {

            animation = this.app.tween.animate({
                origin: {
                    camera, logo,
                    counter: this.counter,
                    star: star.userData,
                    tunnel: tunnel.userData.controls,
                    // taill: logo.userData.taill,
                    // uniforms: logo.userData.uniforms,
                    power: 0,
                    protonOffset: protonBean.userData,
                    protonMass: protonBean.userData.emitter.initializes[1].massPan,
                    protonRadius: protonBean.userData.emitter.initializes[4].radius,
                    protonColors: protonBean.userData.colors,
                },
                target: {
                    protonOffset: {
                        offset: 230
                    },
                    protonMass: {
                        a: 5,
                        b: .5
                    },
                    protonRadius: {
                        a: 50,
                        b: 10
                    },
                    protonColors: {
                        a: { //yellow
                            r: 1,
                            g: 1,
                            b: 0,
                        },
                        b: { //blue
                            r: 0,
                            g: 0,
                            b: 1,
                        }
                    },
                    logo: {
                        position: {
                            y: -500
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
                    // taill: {
                    //     scale: { x: 15, y: 1, z: 1 },
                    //     position: { y: -450 }
                    // },
                    // uniforms: {
                    //     frequency: { value: 10 },
                    //     waves: { value: 2 },
                    //     warp: { value: 5 }
                    // },
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
                        logo: logo,
                        camera: camera,
                        counter: this.counter,
                        star: star.userData,
                        tunnel: tunnel.userData.controls,
                        // taill: logo.userData.taill,
                        // uniforms: logo.userData.uniforms,
                        protonOffset: protonBean.userData,
                        protonMass: protonBean.userData.emitter.initializes[1].massPan,
                        protonRadius: protonBean.userData.emitter.initializes[4].radius,
                        protonColors: protonBean.userData.colors,
                    },
                    target: {
                        protonOffset: {
                            offset: original.protonOffset
                        },
                        protonMass: {
                            a: original.protonMass.a,
                            b: original.protonMass.b,
                        },
                        protonRadius: {
                            a: original.protonRadius.a,
                            b: original.protonRadius.b
                        },
                        protonColors: {
                            a: {
                                r: original.protonColors.a.r,
                                g: original.protonColors.a.g,
                                b: original.protonColors.a.b,
                            },
                            b: {
                                r: original.protonColors.b.r,
                                g: original.protonColors.b.g,
                                b: original.protonColors.b.b,
                            }
                        },
                        logo: {
                            position: {
                                y: original.logoPosition
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
                        // taill: {
                        //     scale: {
                        //         x: original.taill.scale.x,
                        //         y: original.taill.scale.y,
                        //         z: original.taill.scale.z
                        //     },
                        //     position: {
                        //         y: original.taill.position.y
                        //     }
                        // },
                        // uniforms: {
                        //     frequency: {
                        //         value: original.uniforms.frequency.value
                        //     },
                        //     waves: {
                        //         value: original.uniforms.waves.value
                        //     },
                        //     warp: {
                        //         value: original.uniforms.warp.value
                        //     }
                        // }
                    },
                    ease: Tween.CIRCOUT,
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
        main.userData.start()
    }

}