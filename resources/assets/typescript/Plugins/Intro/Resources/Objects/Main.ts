import { ObjectInterface } from "../../Interfaces/ObjectInterface";
import { extend } from "../../../../Helpers";
import { configureMaterial, resize, sprite } from "../../Helpers";
import { Forgable } from "../../Abstracts/Forgable";

import Matter = require("matter-js");

let Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies;

/**
 * Character: Base
 */
export class Main extends Forgable implements ObjectInterface {

    private engine = Engine.create();

    get materials() {
        return {
            material: 'IntroDefaultMaterial',
            point: 'PointsMaterial',

        }
    }

    get animations() {
        return {
            animation: '/assets/models/SmokeAnim.anim'
        }
    }

    /**
     * Create Object
     *
     * @param models
     * @param material
     * @returns {THREE.Group}
     */
    create(objects, {material, point}) {

        let group = new THREE.Group();

        material.fog = false;

        group.add(this.forge('background', material, {
            widthFactor: 2.5,
            heightFactor: 1.5,
            position: {
                x: 50, y: 50, z: 0
            }
        }))

        const platform = this.forge('platform', material, {
            scale: 65, position: {
                x: 50,
                y: 75,
                z: 50
            }
        })

        // platform['material'].alphaTest = .4;

        group.add(platform)

        let planet = this.forge('planet', material, {
            scale: 20,
            position: {
                x: 10,
                y: 10,
                z: 20
            }
        });

        group.add(planet)

        let uranus = this.forge('uranus', material, {
            scale: 50,
            position: {
                x: 100,
                y: 20,
                z: 1
            }
        });

        group.add(uranus)

        // planet['material'].alphaTest = .1;

        group.add(this.forge('transition', material, {
            widthFactor: 2.5,
            heightFactor: 1.5,
            position: {
                x: 50, y: 200 * 1.6, z: 0
            }
        }))

        // let mesh = this.forge('streak', material, {
        //     mesh: THREE.SkinnedMesh,
        //     geometry: smoke,
        //     scale: 40,
        //     position: {
        //         x: 50, y: 80, z: 70
        //     }
        // })

        // mesh.name = 'smoke';
        // mesh['material'].skinning = true;

        // group.add(mesh)

        let smoke = this.createParticles(point);

        group.add(smoke);
        group.userData = {
            update: this.update.bind(this, smoke),
            start: smoke.userData.start.bind(this)
        }

        return group;

    }

    public update(smoke, time, delta) {

        if (smoke instanceof THREE.Points)
            smoke.userData.update(time, delta);

        Engine.update(this.engine);

    }

    public createParticles(material): THREE.Object3D {

        // create an engine
        const engine = this.engine,
            particle = { count: 100, size: 2 },
            bodies = [];

        engine.world.gravity.y = -5;

        const physics = function (positions, time) {

            if (engine.world.bodies.length >= particle.count)
                Matter.World.remove(engine.world, engine.world.bodies[1])

            engine.world.bodies.push(Bodies.circle(0, 0, particle.size))

            for (let i = 0; i < engine.world.bodies.length; i++) {
                positions.array[i * 3] = engine.world.bodies[i].position.x;
                positions.array[i * 3 + 1] = engine.world.bodies[i].position.y;
            }

            positions.needsUpdate = true

        }

        let smokeMaterial = new THREE.PointsMaterial({
            blending: THREE.AdditiveBlending,
            transparent: true,
            size: 150,
            opacity: 0,
            alphaTest: 0.01,
        });

        smokeMaterial['userData'] = material['userData'];

        let smoke = <THREE.Points>this.forge('smoke', smokeMaterial, {
            uvs: false,
            mesh: THREE.Points,
            scale: 50,
            geometry: {
                create: (width, height, view) => {

                    let particles = new THREE.BufferGeometry(),
                        particlePositions = new Float32Array(particle.count * 3);

                    for (let i = 0; i < particle.count; i++) {

                        particlePositions[i * 3] = 0;
                        particlePositions[i * 3 + 1] = 0;
                        particlePositions[i * 3 + 2] = 0

                    }

                    particles.addAttribute('position', new THREE.BufferAttribute(particlePositions, 3).setDynamic(true));

                    particles['userData'] = {
                        particle: particle,
                        update: physics.bind(this, particles.getAttribute('position')),
                        start: () => {
                            smoke.material.opacity = 1;
                        }
                    }

                    return particles;

                }
            },
            position: {
                x: 50, y: 45, z: 50
            }
        })

        smoke.userData = smoke.geometry['userData'];

        const ground = Bodies.rectangle(0, -80, 500, 60, { isStatic: true });

        World.add(engine.world, [ground, ...bodies]);

        return smoke;

    }

}
