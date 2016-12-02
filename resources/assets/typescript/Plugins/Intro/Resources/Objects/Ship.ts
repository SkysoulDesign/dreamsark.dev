import { ObjectInterface } from "../../Interfaces/ObjectInterface";
import { Forgable } from "../../Abstracts/Forgable";
import { random, deg2rad } from "../../Helpers";
import { Tween } from "../../Modules/Tween";

require('../../../../../../../public/js/GPUParticleSystem.js')

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
        ship.visible = false;

        const dreamsark = <THREE.Mesh>this.forge('logo', material, {
            scale: 18,
            position: {
                x: 50, y: 45, z: 65
            }
        });

        dreamsark.name = 'dreamsark';

        group.add(dreamsark);

        // let glow = new THREE.Sprite(
        //     new THREE.SpriteMaterial({
        //         map: material.userData.glow,
        //         color: 0x0000ff,
        //         transparent: false,
        //         blending: THREE.AdditiveBlending
        //     })
        // )

        // ship.add(glow);

        // console.log(ship.position.z)

        // glow.scale.setScalar(200);
        // glow.position.x = ship.position.x
        // glow.position.y = ship.position.y
        // glow.position.z = ship.position.z

        // console.log(glow)

        streak.visible = false;

        streak.translateOnAxis(new THREE.Vector3(1.8, 0, 0), 20)

        group.userData = {
            taill: streak,
            uniforms: streak.material['userData'].uniforms,
            booster: 1,
            update: this.update.bind(this, group),
            transform: this.transform.bind(this, group, material),
            transformDone: false,
        }

        return group

    }

    public transform(group, material: any, scene: THREE.Scene, queue) {

        let dreamsark = group.getObjectByName('dreamsark');
        let logo = group.getObjectByName('logo');
        let geometry = new THREE.SphereBufferGeometry(10, 50, 50);
        let sphereMaterial = new THREE.MeshBasicMaterial({
            // color: 0x2222ff,
            transparent: true,
            blending: THREE.AdditiveBlending,
            map: material.userData.tunnel,
            // side: THREE.BackSide,
            depthTest: false,
            fog: false,
            opacity: 0
        });

        let particles = this.createParticles(),
            orb = new THREE.Mesh(geometry, sphereMaterial);

        particles.position.copy(dreamsark.position)
        orb.position.copy(dreamsark.position)

        material.userData.tunnel.wrapT = material.userData.tunnel.wrapS = THREE.RepeatWrapping;
        material.userData.tunnel.repeat.set(1, 2);

        // orb.rotation.x = deg2rad(90);
        orb.name = 'orb';
        orb.userData.velocity = 0.5;
        orb.userData.update = function () {
            // orb.rotation.x += 0.053
            orb.rotation.y += orb.userData.velocity
            // orb.rotation.z += 0.0033
            orb['material']['map'].offset.y -= 0.003;
            orb['material']['map'].offset.x -= 0.003;

        };

        console.log(dreamsark)

        queue['orb'] = orb;
        queue['particles'] = particles;

        group.add(orb);
        scene.add(particles)

        let animation = this.app.tween.animate({
            origin: {
                orb: orb,
            },
            target: {
                orb: {
                    userData: {
                        velocity: 0.0083
                    },
                    material: {
                        opacity: 1
                    },
                    scale: {
                        x: 4.5, y: 4.5, z: 4.5
                    }
                }
            },
            ease: Tween.EXPOOUT,
            duration: 1.5,
            before: () => {

            },
            update: () => {

            }

        })

        animation.then({
            origin: {
                orb: orb,
            },
            target: {
                orb: {
                    userData: {
                        velocity: 0.3
                    },
                    scale: {
                        x: 50, y: 50, z: 50
                    }
                }
            },
            ease: Tween.QUADIN,
            duration: 3,
            after: () => {
                dreamsark.visible = false;
                logo.visible = true;
            }
        })

        animation.then({
            origin: {
                orb: orb,
                particles: particles.userData
            },
            target: {
                particles: {
                    spawnerOptions: {
                        spawnRate: 0
                    }
                },
                orb: {
                    // material: {
                    //     opacity: 0
                    // },
                    userData: {
                        velocity: 0.5
                    },
                    scale: {
                        x: 3, y: 3, z: 3
                    }
                }
            },
            ease: Tween.EXPOOUT,
            duration: 1
        })

        /**
         * Clean Up
         */
        animation.then(() => {

            group.userData.transformDone = true;

            // delete queue['orb']

            setTimeout(function () {
                delete queue['particles']
                scene.remove(particles)
            }, 3000);

            // scene.remove(orb)

        })

    }

    public createParticles() {

        let particleSystem = new THREE.GPUParticleSystem({
            maxParticles: 250000
        });

        let clock = new THREE.Clock(),
            tick = 0,
            spawnerOptions = {
                spawnRate: 15000,
                horizontalSpeed: 5,
                verticalSpeed: 4,
                timeScale: 0.8,
                x: Math.cos,
                y: Math.sin,
                z: Math.sin
            },
            options = {
                position: new THREE.Vector3(),
                positionRandomness: 1,
                velocity: new THREE.Vector3(),
                velocityRandomness: 1,
                color: 0xaa88ff,
                colorRandomness: .2,
                turbulence: .5,
                lifetime: 5,
                size: 1,
                sizeRandomness: 10
            };

        console.log(spawnerOptions);
        console.log(options);

        particleSystem.userData = {
            spawnerOptions,
            options,
            update: (time) => {

                let delta = clock.getDelta() * spawnerOptions.timeScale;

                tick += delta;

                if (tick < 0) tick = 0;

                if (delta > 0) {

                    options.position.x = spawnerOptions['x'](tick * spawnerOptions.horizontalSpeed) * 50;
                    options.position.y = spawnerOptions['y'](tick * spawnerOptions.verticalSpeed) * 50;
                    options.position.z = spawnerOptions['z'](tick * spawnerOptions.horizontalSpeed) * 50;;

                    for (var x = 0; x < spawnerOptions.spawnRate * delta; x++) {

                        // let opt = options;

                        // options.lifetime = random.between(0, 2);

                        // Yep, that's really it.	Spawning particles is super cheap, and once you spawn them, the rest of
                        // their lifecycle is handled entirely on the GPU, driven by a time uniform updated below
                        particleSystem.spawnParticle(options);
                    }
                }

                particleSystem.update(tick);
            }
        }

        return particleSystem;

    }

    public update(object: THREE.Object3D, time, delta) {

        object['userData'].uniforms.angle.value += object['userData'].uniforms.frequency.value;
        object['userData'].taill.rotation.y += .9;

        // object['userData'].streak.scale.setX(Math.sin(time));

        object.children.forEach((child, i) => {

            if (child.name === 'logo' || child.name === 'dreamsark' || child.name === 'orb') return;

            child.children[0].scale.set(Math.abs(Math.sin(time) * .2) + 2, .2, 1)

            if (child.position.y > child.userData.respawnAt) {
                this.respawn(child)
            }

            if (child.position.y < -child.userData.respawnAt) {
                this.respawn(child, false)
            }

            child.position.y += child.userData.velocity * object.userData.booster;

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