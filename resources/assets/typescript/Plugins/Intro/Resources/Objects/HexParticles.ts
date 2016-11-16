import { ObjectInterface } from "../../Interfaces/ObjectInterface";
import PlaneGeometry = THREE.PlaneGeometry;
import { Forgable } from "../../Abstracts/Forgable";
import { random } from "../../Helpers";

/**
 * Main Particles
 */
export class HexParticles extends Forgable implements ObjectInterface {

    get materials() {
        return {
            material: 'PointsMaterial'
        }
    }

    create(models, {material}) {

        let group = new THREE.Group(),
            mesh = <THREE.Points>this.forge('hex', material, {
                uvs: false,
                position: {
                    x: 50, y: 50, z: 20
                }
            })

        let pinkMaterial = <THREE.PointsMaterial>mesh.material.clone(),
            pink = this.createMesh(mesh.geometry.clone(), pinkMaterial);

        let lilasMaterial = <THREE.PointsMaterial>mesh.material.clone(),
            lilas = this.createMesh(mesh.geometry.clone(), lilasMaterial);

        pinkMaterial.color.setHex(0x7a1762);
        lilasMaterial.color.setHex(0xb505ce);

        group.add(pink);
        group.add(lilas);
        group.add(mesh);

        group.userData = mesh.geometry['userData'];
        group.userData.update = this.update.bind(this, group);
        group.userData.decay = 0;

        return group;

    }

    public createMesh(geometry, material) {
        return new THREE.Points(geometry, material);
    }

    public createGeometry(width, height, view) {

        let maxParticleCount = 100,
            radius = view.width * 1.5,
            particles = new THREE.BufferGeometry(),
            particlePositions = new Float32Array(maxParticleCount * 3),
            colors = new Float32Array(maxParticleCount * 3);

        /**
         * Store Data
         */
        particles['userData'] = {
            velocities: [[], [], []], view
        };

        /**
         * Add Vertices to Points
         */
        for (let i = 0; i < maxParticleCount; i++) {

            let vector = random.vector3(0, 0, 0, radius, false);

            particlePositions[i * 3] = vector.x + Math.random();
            particlePositions[i * 3 + 1] = vector.y + Math.random();
            particlePositions[i * 3 + 2] = random.between(
                this.camera.position.z / 4, this.camera.position.z
            );

            /**
             * Randomize Opacity
             */
            colors[i * 3] = colors[i * 3 + 1] = colors[i * 3 + 2] = random.between(1, 100) * 0.01;

            for (let j = 0; j < 3; j++) {
                particles['userData'].velocities[j].push([
                    random.between(-10, 10), random.between(-10, 10)
                ]);
            }

        }

        particles.addAttribute('position', new THREE.BufferAttribute(particlePositions, 3).setDynamic(true));
        particles.addAttribute('color', new THREE.BufferAttribute(colors, 3).setDynamic(true));

        return particles;

    }

    private update(particles: THREE.Group) {

        let userData = particles.userData,
            distanceX = userData.view.width / 2,
            distanceY = userData.view.height / 2,
            speed = 30;

        if (userData.decay !== 0) {

            particles.position.y -= userData.decay;

            if (particles.position.y <= -userData.view.height * 3) {
                return true;
            }

        }

        particles.children.forEach(function (child: any, index) {

            let positions = child.geometry.getAttribute('position'),
                velocity = userData['velocities'][index];

            for (let i = 0; i < positions.count; i++) {

                positions.array[i * 3] += velocity[i][0] / speed;
                positions.array[i * 3 + 1] += (velocity[i][1] / speed);

                if (positions.array[i * 3] < -distanceX || positions.array[i * 3] > distanceX)
                    velocity[i][0] = -velocity[i][0];

                if (positions.array[i * 3 + 1] < -distanceY || positions.array[i * 3 + 1] > distanceY)
                    velocity[i][1] = -velocity[i][1];

            }

            positions.needsUpdate = true;

        })

    };
}
