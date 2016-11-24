import { ObjectInterface } from "../../Interfaces/ObjectInterface";
import { Forgable } from "../../Abstracts/Forgable";
import { random, deg2rad } from "../../Helpers";

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
            uvs: false,
            position: {
                x: 50, y: 50, z: 5
            }
        })

        particles.userData.update = this.update.bind(this, particles);
        particles.userData.speed = 0;
        particles.userData.vortexEnabled = false;
        particles.userData.circle = new THREE.CircleGeometry(200, 50);
        particles.userData.align = this.align.bind(this, particles);

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
            velocity: [], completed: false
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

        /**
         * No point if speed is 0
         */
        if (particles.userData.speed <= 0) return;

        let tunnel = particles.userData.vortexEnabled,
            positions = particles.geometry.getAttribute('position'),
            distanceX = tunnel ? 1000 : particles.userData.meta.view.width / 2,
            distanceY = tunnel ? 1500 : particles.userData.meta.view.height / 2;

        for (let i = 0; i < positions.count; i++) {

            let velocity = particles.geometry.userData.velocity[i];

            positions.array[i * 3 + 1] -= (velocity[0] / 10) * particles.userData.speed;

            if (positions.array[i * 3 + 1] < -distanceY && !particles.userData.completed)
                positions.array[i * 3 + 1] = distanceY

        }

        positions.needsUpdate = true;

    };

    public align(particles, {value}) {

        let positions = particles.geometry.getAttribute('position'),
            matrix = (new THREE.Matrix4()).makeRotationX(-deg2rad(90));

        for (let i = 0; i < positions.count; i++) {

            let dest = particles.userData.circle.vertices[
                (i % (particles.userData.circle.vertices.length - 1)) + 1
            ].clone().applyMatrix4(matrix.makeRotationY(i))

            let origin = new THREE.Vector3(
                positions.array[i * 3], positions.array[i * 3 + 1], positions.array[i * 3 + 2]
            );

            positions.array[i * 3] = (origin.x + (((dest.x - origin.x) / 100) * value));
            positions.array[i * 3 + 2] = (origin.z + (((dest.z - origin.z) / 100) * value));

        }

        positions.needsUpdate = true;

    }

}
