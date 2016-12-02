import { Composition } from "../Abstracts/Composition";
import { Animator } from "../Modules/Animator";
import { Tween } from "../Modules/Tween";
import { is } from "../../Helpers";
import { deg2rad } from "../Helpers";
import { Glow } from "../Effects/Glow";

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
    m_bMyTestBoolean: boolean = false;
    queue = {};

    renderTarget;
    renderTarget2;
    renderTarget3;
    renderTarget4;
    bufferScene;
    bufferScene2;
    originalScene;
    newCamera;
    mirror;
    mirror2;

    /**
     * Special Key
     */
    specialScene;
    specialTarget;

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
            'tunnel',
            'buttons',
            'cockpit',
            'flare'
            // 'tunnel',
            // 'streak'
        ];
    }

    // public setup() {

    //     let {width, height, aspect} = this.app.browser;

    //     this.renderTarget = new THREE.WebGLRenderTarget(
    //         width, height, {
    //             depthBuffer: true
    //         }
    //     );

    //     this.renderTarget2 = new THREE.WebGLRenderTarget(
    //         width / 2, height / 2, {
    //             depthBuffer: true
    //         }
    //     );

    //     this.renderTarget3 = new THREE.WebGLRenderTarget(
    //         width / 2, height / 2, {
    //             depthBuffer: true
    //         }
    //     );

    //     this.renderTarget4 = new THREE.WebGLRenderTarget(
    //         width / 2, height / 2, {
    //             depthBuffer: true
    //         }
    //     );

    //     this.bufferScene = new THREE.Scene();
    //     this.bufferScene2 = new THREE.Scene();
    //     this.newCamera = new THREE.OrthographicCamera(0, 100, 0, -100, 0, 10000)

    //     let shader = new THREE.ShaderMaterial({
    //         vertexShader: <string>require('raw!../Resources/Shaders/Test.vert.shader'),
    //         fragmentShader: <string>require('raw!../Resources/Shaders/Test.frag.shader'),
    //         uniforms: {
    //             h: { type: "f", value: 1 / height / 8 },
    //             texture: { type: "t", value: this.renderTarget.texture },
    //             texture2: { type: "t", value: this.renderTarget2.texture },
    //         }
    //     });

    //     this.mirror = new THREE.Mesh(
    //         new THREE.PlaneGeometry(100, 100), shader
    //     )

    //     this.mirror2 = new THREE.Mesh(
    //         new THREE.PlaneGeometry(100, 100), new THREE.MeshBasicMaterial({
    //             map: this.renderTarget.texture
    //         })
    //     )

    //     this.mirror.position.set(50, -50, 0)
    //     this.mirror2.position.set(50, -50, 0)

    //     this.bufferScene.add(this.mirror);
    //     this.bufferScene2.add(this.mirror2);

    // }

    // public render() {

    //     let {width, height} = this.app.browser;

    //     // // this.app.renderer.context.viewport(0,0,width, height)

    //     // this.app.renderer.render(
    //     //     this.scene, this.camera, this.renderTarget
    //     // );


    //     // // this.app.renderer.render(
    //     // //     this.bufferScene, this.newCamera
    //     // // );

    //     // this.app.renderer.render(
    //     //     this.bufferScene2, this.newCamera, this.renderTarget2
    //     // );
    //     // this.app.renderer.render(
    //     //     this.bufferScene, this.newCamera
    //     // );
    // }

    // uniforms;
    // mesh;

    // public glow(logo: THREE.Object3D) {

    //     logo['geometry'].computeBoundingBox()

    //     let box = logo['geometry'].boundingBox
    //     let size = box.max.sub(box.min);

    //     let elements = this.app.camera.matrix;

    //     this.uniforms = {
    //         // cameraLookAt: { type: "vec3", value: new THREE.Vector3(elements[8], elements[9], elements[10]) },
    //         // size: { type: "vec3", value: size },
    //         // texture: { type: "t", value: logo['material']['map'] },
    //         // cameraViewMatrix: { type: "mat4", value: this.app.camera.modelViewMatrix },

    //         glowColor: { type: "c", value: new THREE.Color('red') },
    //         "c": { type: "f", value: 0 },
    //         "p": { type: "f", value: 6 },
    //         viewVector: { type: "v3", value: this.camera.position.clone() }
    //     }

    //     let shader = new THREE.ShaderMaterial({
    //         vertexShader: <string>require('raw!../Resources/Shaders/Beta.vert.shader'),
    //         fragmentShader: <string>require('raw!../Resources/Shaders/Beta.frag.shader'),
    //         blending: THREE.AdditiveBlending,
    //         transparent: true,
    //         uniforms: this.uniforms
    //     });

    //     // console.log(this.app.camera.matrix.elements[])

    //     let mesh = new THREE.Mesh(
    //         new THREE.SphereGeometry(20, 10, 10), new THREE.MeshBasicMaterial()
    //     )

    //     // mesh.position.setX(50)

    //     // let clone = mesh.clone()
    //     // clone.scale.multiplyScalar(1.6);

    //     // clone.material = shader;

    //     // this.mesh = mesh;

    //     // console.log(logo)

    //     // this.scene.add(clone)
    //     // this.scene.add(mesh)


    //     shader.userData = logo['material'].userData


    //     // let moon = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), )

    //     // logo['material'] = shader;

    //     // let cloneLogo = logo.clone()
    //     //     cloneLogo['material'] = shader;

    //     // cloneLogo.scale.multiplyScalar(1.1);

    //     // let parent = logo.parent;

    //     // let group = new THREE.Group();
    //     //     group.add(logo)
    //     //     group.add(cloneLogo)

    //     // group.name = 'logo'

    //     // parent.add(group)


    //     // console.log(cloneLogo)

    //     // moon.userData.update = function () {

    //     // }

    //     // this.queue['moon'] = moon;
    //     // this.scene.add(moon);

    // }

    private glow: Glow;

    public stage(objects) {

        let {ship, main, hexParticles, star, tunnel, streak, plexus, galaxy, fx, buttons} = objects;

        main.add(buttons);

        this.scene.add(main);
        this.scene.add(hexParticles);
        this.scene.add(ship);
        this.scene.add(star);

        /**
         * Test
         */

        // let geometry = new THREE.CircleGeometry(50, 50),
        //     rings = new THREE.Group()

        // for (let i = 0; i < 3; i++) {

        //     let mesh = new THREE.Line(geometry, new THREE.LineBasicMaterial({
        //         opacity: 0.01,
        //         blending: THREE.AdditiveBlending,
        //     }))

        //     mesh.scale.addScalar(i * i * .5);

        //     rings.add(mesh);

        // }

        // this.scene.add(rings);

        /**
         * End Test
         */

        // this.scene.add(tunnel);

        this.app.audio.play('ambient')

        let map = star.userData.dot.userData.glow;

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
        ]

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
                speed: 2.5,
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
                this.mouse = false;
            },
            after: () => {
                // this.mouseInverse = true;
            },
            update({align}, time, completion) {
                star.userData.align(align)
            }
        })

        /**
        * Cockpit
        */
        animation.then({
            origin: {
                cockpit: cockpit,
                ship: ship.position,
            },
            target: {
                ship: {
                    z: 800
                },
                cockpit: {
                    material: {
                        opacity: 1
                    },
                    position: {
                        z: 200
                    }
                }
            },
            before: () => {
                this.scene.add(cockpit)
            },
            ease: Tween.EXPOINOUT,
            duration: 3
        })

        /**
         * Momentum
         */
        animation.then({
            origin: {
                // position: ship.position,
                star: star.userData,
            },
            target: {
                // position: {
                //     z: 0
                // },
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
                flare: flare,
                power: 0,
                spin: 0,
            },
            target: {
                flare: {
                    position: {
                        z: -500
                    },
                    scale: {
                        y: 50
                    }
                },
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
                // position: {
                //     z: 5
                // },
                star: {
                    speed: 25
                },
                power: 0.015,
            },
            ease: Tween.EXPOIN,
            duration: 2,
            before: () => {

                this.scene.add(flare)
                this.scene.add(fx);
                this.queue['fx'] = fx;
                this.queue['tunnel'] = tunnel;

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
                cockpit: cockpit.position
            },
            target: {
                cockpit: { z: 1500 },
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
                star: star.userData,
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

                setTimeout(this.initTutorial, 4000);

                document.querySelector('#vignette')['style'].opacity = 0.4;

                star.userData.completed = true;
                this.queue['plexus'] = plexus;
                this.scene.add(plexus);
                this.scene.add(galaxy);

            },
            update({depth, star}) {

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

        // this.uniforms.cameraViewMatrix.value = this.app.camera.modelViewMatrix;

        // this.uniforms.viewVector.value.subVectors(this.camera.position, this.mesh.position);

        let mouse = this.app.mouse,
            camera = this.camera;

        let {hexParticles, ship, galaxy} = objects;

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

        this.glow.render(this.app)
        // this.render();

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
        main.getObjectByName('smoke').userData.start();
        this.queue['smoke'] = main;
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
            poster = document.querySelector('#poster'),
            name = document.querySelector('#name'),
            description = document.querySelector('#description'),
            controls = this.app.controls.instance;

        poster.setAttribute('src', object.material.userData.poster)
        name.textContent = object.material.userData.name
        description.textContent = object.material.userData.description

        controls.enabled = false;
        this.open = true;

        let original = this.camera.clone(),
            target = controls.target.clone();

        this.camera.moveTo(object, () => {

            element['style'].display = 'flex';

            element.getElementsByClassName('close')[0].addEventListener('click', event => {
                element['style'].display = 'none';

                this.camera.moveTo(original, () => {
                    controls.target.copy(target)
                    this.open = false;
                    controls.enabled = true;
                })

            }, false);

        })

    }

}