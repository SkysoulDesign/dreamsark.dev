import { Composition } from "../Abstracts/Composition";
import { Tween } from "../Modules/Tween";
import { is } from "../../Helpers";
import { deg2rad } from "../Helpers";
import { Glow } from "../Effects/Glow";

/**
 * Galaxy Composition
 */
export class Galaxy extends Composition {

    private open: boolean = false;
    private glow: Glow;
    private tunnel;
    private protonBean;
    private queue;
    private tutorialDone: boolean = false;

    get objects(): string[] {
        return [
            'plexus',
            'galaxy',
        ];
    }

    public setup(app, {glow, queue, tunnel, protonBean}) {

        this.glow = glow;
        this.tunnel = tunnel;
        this.protonBean = protonBean;
        this.queue = queue;
        this.app.camera.fov = 8;
        this.app.camera.zoom = 0.1;
        this.app.camera.far = 500000 * 50;
        this.app.camera.rotation.z = deg2rad(360);
        this.app.camera.updateProjectionMatrix();

        delete this.queue['hexParticles'];
        delete this.queue['ship'];
        delete this.queue['star'];
        delete this.queue['tunnel'];
        this.app.renderer.setClearColor(0x000000)

        // this.scene.fog = new THREE.Fog(0x000000, 0, 4500);
        // console.log(this.scene.fog)

        /**
         * Wait it totally fades then remove
         */
        protonBean.userData.emitter.stopEmit();

        setTimeout(() => delete this.queue['protonBean'], 5000)

        this.scene.remove(this.tunnel);
        // this.scene.fog = null;

    }

    public stage(objects) {

        let { plexus, galaxy} = objects,
            fader = document.querySelector('#fader');

        /**
         * Rotate Galaxy
         */
        this.queue['galaxy'] = galaxy;

        /**
         * Create Protons
         */
        plexus.userData.createProtons(this.protonBean);

        /**
         * Init Tutorial
         */
        let animation = this.app.tween.animate({
            origin: { glow: this.glow.uniforms },
            target: {
                glow: {
                    exposure: {
                        value: 0.3
                    },
                    colorRange: {
                        value: .95
                    }
                }
            },
            duration: 1,
            before: () => {

                this.initTutorial()

                this.queue['plexus'] = plexus;
                this.scene.add(plexus);
                this.scene.add(galaxy);

            },
            update: () => {
                return !this.tutorialDone;
            }

        });

        /**
        * Enter plexus
        */
        animation.then({
            origin: {
                plexus: plexus,
                angle: this.camera.rotation,
                tunnel: this.tunnel,
            },
            target: {
                angle: {
                    z: 0
                },
                plexus: {
                    position: {
                        z: 0.00000001
                    }
                }
            },
            duration: 15,
            ease: Tween.EXPOOUT,
            before: () => {

                fader['style'].opacity = 0;

                // plexus.userData.materials.forEach((material: THREE.Material) => {
                //     material.opacity = 1;
                // })

                // galaxy.userData.materials.forEach((material: THREE.Material) => {
                //     material.opacity = 0.8;
                // })

            },
            after: () => {

                this.app.controls.instance.enabled = true;

                document.querySelector('#vignette')['style'].opacity = 0.3;

                const action = (object, intersects) => {

                    if (!this.open)
                        this.showProject(object);
                }

                plexus.userData.nodesBag.forEach(node => {
                    this.app.mouse.ray(node, action);
                })

                fader['style'].display = 'none';

            }
        })

    }

    public showProject(object) {

        let element = document.querySelector('#overlay'),
            poster = document.querySelector('#poster'),
            name = document.querySelector('#name'),
            description = document.querySelector('#description'),
            controls = this.app.controls.instance;

        element['style'].display = 'flex';
        console.log(poster)
        // let options = { "controls": true, "autoplay": false, "preload": "auto", poster: object.material.userData.poster };
        // let player = videojs('#poster', options);

        poster.setAttribute('src', '/assets/videos/video.mp4')
        poster.setAttribute('poster', object.material.userData.poster)

        name.textContent = object.material.userData.name
        description.textContent = object.material.userData.description

        controls.enabled = false;
        this.open = true;

        let original = this.camera.clone(),
            target = controls.target.clone(),
            plexus = object.parent.parent.parent,
            verticePosition = (new THREE.Vector3()).fromAttribute(
                object.geometry.getAttribute('position'), 1
            );

        /**
         * Stop Rotation
        */
        plexus.userData.rotate = false;

        let position: THREE.Vector3 = verticePosition.applyMatrix4(plexus.matrix)

        this.camera.moveTo(position, () => {

            element['style'].opacity = 1;
            element.firstElementChild['style'].transform = 'scale(1)';

            element.getElementsByClassName('close')[0].addEventListener('click', event => {

                element['style'].opacity = 0;
                element.firstElementChild['style'].transform = 'scale(0.1)';

                /**
                 * Restart Rotation
                 */
                plexus.userData.rotate = true;

                this.camera.moveTo(original, () => {
                    // controls.target.copy(target)
                    this.open = false;
                    controls.enabled = true;
                    element['style'].display = 'none';
                }, 0)

            }, false);

        })

    }

    public initTutorial() {

        let element = document.querySelector('#tutorial');

        element['style'].display = 'flex';
        setTimeout(() => element['style'].opacity = 1, 100);

        let canvas = document.querySelector('canvas');
        canvas['style'].backgroundColor = 'black';

        element.getElementsByTagName('button')[0].addEventListener('click', event => {

            this.tutorialDone = true;
            element['style'].opacity = 0;

            setTimeout(() => element['style'].display = 'none', 1000)

        }, false)

    }

    public update(objects, time, delta) {

        for (let property in this.queue) {
            if (this.queue[property].userData.update(time, delta)) {

                if (is.Function(this[`${property}Done`])) {
                    this[`${property}Done`](objects)
                }

                delete this.queue[property];

            }
        }

        this.glow.render(this.app);

    }

}