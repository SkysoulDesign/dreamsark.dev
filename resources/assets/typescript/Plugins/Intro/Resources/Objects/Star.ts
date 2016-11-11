import { ObjectInterface } from "../../Interfaces/ObjectInterface";
import PlaneGeometry = THREE.PlaneGeometry;
import { Forgable } from "../../Abstracts/Forgable";
import { random } from "../../Helpers";

/**
 * Main Particles
 */
export class Star extends Forgable implements ObjectInterface {

    get materials() {
        return {
            material: 'PointsMaterial'
        }
    }

    create(models, {material}) {

        let point = <THREE.PointsMaterial>material;

        point.size = 12;
        point.color = new THREE.Color('white');
        point.blending = THREE.NormalBlending;
        point.vertexColors = false;
        point.alphaTest = .1;
        point.needsUpdate = true;
        point.opacity = .2

        let particles = <THREE.Points>this.forge('star', point, {
            position: {
                x: 50, y: 50, z: 5
            }
        })

        particles.userData.update = this.update.bind(this, particles);
        particles.userData.speed = 0;
        particles.userData.vortex = this.vortex.bind(this, particles);
        particles.userData.vortexEnabled = false;
        particles.userData.circle = new THREE.CircleGeometry(100, 30);

        return particles;

    }

    public createMesh(geometry, material) {
        return new THREE.Points(geometry, material);
    }

    public createGeometry(width, height, view) {

        let maxParticleCount = 700,
            radius = view.width * 1.5,
            particles = new THREE.BufferGeometry(),
            particlePositions = new Float32Array(maxParticleCount * 3);

        /**
         * Store Data
         */
        particles['userData'] = {
            velocity: []
        };

        /**
         * Add Vertices to Points
         */
        for (let i = 0; i < maxParticleCount; i++) {

            let vector = random.vector3(0, 0, 0, radius, false);

            particlePositions[i * 3] = vector.x + Math.random();
            particlePositions[i * 3 + 1] = vector.y + Math.random();
            particlePositions[i * 3 + 2] = random.between(
                this.camera.position.z / 4, this.camera.position.z / 2
            );

            particles['userData'].velocity.push([
                random.between(10, 50)
            ]);

        }

        particles.addAttribute('position', new THREE.BufferAttribute(particlePositions, 3).setDynamic(true));

        return particles;

    }

    private update(particles, time) {

        if (particles.userData.vortexEnabled) {
            return this.vortex(particles, time);
        }

        /**
         * No point if speed is 0
         */
        if (particles.userData.speed <= 0) return;

        let positions = particles.geometry.getAttribute('position'),
            distanceX = particles.userData.meta.view.width / 2,
            distanceY = particles.userData.meta.view.height / 2;

        for (let i = 0; i < positions.count; i++) {

            let velocity = particles.geometry.userData.velocity[i];

            positions.array[i * 3 + 1] -= (velocity[0] / 10) * particles.userData.speed;

            if (positions.array[i * 3 + 1] < -distanceY)
                positions.array[i * 3 + 1] = distanceY

        }

        positions.needsUpdate = true;

    };

    public vortex(particles, time: number) {

        let positions = particles.geometry.getAttribute('position'),
            distanceX = particles.userData.meta.view.width / 2,
            distanceY = particles.userData.meta.view.height / 2;

        for (let i = 0; i < positions.count; i++) {

            var vector = particles.userData.circle.vertices[
                Math.floor(random.between(1, particles.userData.circle.vertices.length - 1))
            ];

            positions.array[i * 3] = vector.x + Math.random() * 2;
            positions.array[i * 3 + 1] = vector.y + Math.random() * 2;
            positions.array[i * 3 + 2] = vector.z + Math.random() * 2;

        }

        positions.needsUpdate = true;

    }

}
