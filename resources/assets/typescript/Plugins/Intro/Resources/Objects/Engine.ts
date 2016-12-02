import { ObjectInterface } from "../../Interfaces/ObjectInterface";
import { Forgable } from "../../Abstracts/Forgable";
import { random, deg2rad } from "../../Helpers";

require('../../../../../../../public/js/GPUParticleSystem.js')

/**
 * Engine
 */
export class Engine extends Forgable implements ObjectInterface {

    get materials() {
        return {
            material: 'FXShaderMaterial'
        }
    }

    private clock = new THREE.Clock();

    create(models, {material}) {

        let particleSystem = new THREE.GPUParticleSystem({
            maxParticles: 250000
        });

        particleSystem.userData = {
            update: this.update.bind(this, particleSystem)
        }

        return particleSystem

    }

    private spawnerOptions = {
        spawnRate: 15000,
        horizontalSpeed: 1.5,
        verticalSpeed: 50,
        timeScale: 1
    }

    private options = {
        position: new THREE.Vector3(),
        positionRandomness: 0,
        velocity: new THREE.Vector3(0, -1500, 0),
        velocityRandomness: .1,
        color: 0xaa88ff,
        colorRandomness: .2,
        turbulence: 0,
        lifetime: 2,
        size: 50,
        sizeRandomness: 0
    };

    private tick = 0;

    public update(particleSystem: any, time) {

        let clock = this.clock,
            spawnerOptions = this.spawnerOptions,
            options = this.options;

        let delta = clock.getDelta() * spawnerOptions.timeScale;

        this.tick += delta;

        if (this.tick < 0) this.tick = 0;

        if (delta > 0) {

            options.position.y += 0.1;

            // if (options.position.y > 30) {
            //     options.position.y = 0;
            // }

            // options.position.x = Math.sin(this.tick * spawnerOptions.horizontalSpeed) * 20;
            // options.position.y = Math.sin(this.tick * spawnerOptions.verticalSpeed) * 10;
            // options.position.z = Math.sin(this.tick * spawnerOptions.horizontalSpeed + spawnerOptions.verticalSpeed) * 5;

            for (var x = 0; x < spawnerOptions.spawnRate * delta; x++) {

                // let opt = options;

                // options.lifetime = random.between(0, 2);

                // Yep, that's really it.	Spawning particles is super cheap, and once you spawn them, the rest of
                // their lifecycle is handled entirely on the GPU, driven by a time uniform updated below
                particleSystem.spawnParticle(options);
            }
        }

        particleSystem.update(this.tick);

    }

}
