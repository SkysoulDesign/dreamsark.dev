module DreamsArk.Elements {

    import deg2rad = DreamsArk.Helpers.deg2rad;
    import random = DreamsArk.Helpers.random;
    import For = DreamsArk.Helpers.For;
    import Browser = DreamsArk.Modules.Browser;

    export class ChaosParticles implements Loadable {

        public instance:THREE.Object3D;

        data() {
            return {
                velocity: [],
                layers: {
                    purple: {velocity: []},
                    pink: {velocity: []},
                    lilas: {velocity: []}
                }
            }
        }

        maps():{} {
            return {
                particle: 'lib/hex.png',
            }
        }

        create(maps, objs, data) {

            var maxParticleCount = 200,
                radius = 200,
                group = new THREE.Group();

            var PointPurpleMaterial = new THREE.PointsMaterial({
                    color: 0x351c41,
                    size: 2,
                    blending: THREE.AdditiveBlending,
                    map: maps.particle,
                    transparent: true,
                    alphaTest: 0.01,
                    sizeAttenuation: true,
                    vertexColors: THREE.VertexColors,
                }),
                PointPinkMaterial = PointPurpleMaterial.clone(),
                PointLilasMaterial = PointPurpleMaterial.clone();

            PointPinkMaterial.color.setHex(0x7a1762);
            PointLilasMaterial.color.setHex(0xb505ce);

            var particles = new THREE.BufferGeometry(),
                particlePositions = new Float32Array(maxParticleCount * 3),
                colors = new Float32Array(maxParticleCount * 3);

            /**
             * Add Vertices to Points
             */
            For(maxParticleCount, function (i) {

                var vector = random.vector3(0, 0, 0, radius, false);

                particlePositions[i * 3] = vector.x + Math.random();
                particlePositions[i * 3 + 1] = vector.y + Math.random();
                particlePositions[i * 3 + 2] = random.between(-100, 200);

                /**
                 * Randomize Opacity
                 */
                colors[i * 3] = colors[i * 3 + 1] = colors[i * 3 + 2] = random.between(1, 100) * 0.01;

                data.layers.purple.velocity.push(
                    new THREE.Vector3(5 * Math.random(), 5 * Math.random(), 5 * Math.random())
                );

                data.layers.pink.velocity.push(
                    new THREE.Vector3(5 * Math.random(), 5 * Math.random(), 5 * Math.random())
                );

                data.layers.lilas.velocity.push(
                    new THREE.Vector3(5 * Math.random(), 5 * Math.random(), 5 * Math.random())
                );

            });

            particles.addAttribute('position', new THREE.BufferAttribute(particlePositions, 3).setDynamic(true));
            particles.addAttribute('color', new THREE.BufferAttribute(colors, 3).setDynamic(true));

            data.layers.purple.particles = new THREE.Points(particles, PointPurpleMaterial);

            var clone = particles.clone();
            clone.scale(4, 4, 4);
            data.layers.pink.particles = new THREE.Points(clone, PointPinkMaterial);

            var clone = particles.clone();
            clone.scale(8, 8, 8);
            data.layers.lilas.particles = new THREE.Points(clone, PointLilasMaterial);

            group.add(data.layers.purple.particles);
            group.add(data.layers.pink.particles);
            group.add(data.layers.lilas.particles);

            data.update = function () {

                var particles = group,
                    speed = 50,
                    distance = 50,

                    /**
                     * Purple
                     */
                    purplePositions = data.layers.purple.particles.geometry.attributes.position,
                    purpleVelocities = data.layers.purple.velocity,

                    /**
                     * Pink
                     */
                    pinkPositions = data.layers.pink.particles.geometry.attributes.position,
                    pinkVelocities = data.layers.pink.velocity,

                    /**
                     * Lilas
                     */
                    lilasPositions = data.layers.lilas.particles.geometry.attributes.position,
                    lilasVelocities = data.layers.lilas.velocity;

                For(purplePositions.count, function (i) {

                    /**
                     * Purple
                     * @type {number}
                     */
                    purplePositions.array[i * 3] += purpleVelocities[i].x / speed;
                    purplePositions.array[i * 3 + 1] += purpleVelocities[i].y / speed;

                    if (purplePositions.array[i * 3 + 1] < -distance || purplePositions.array[i * 3 + 1] > distance)
                        purpleVelocities[i].y = -purpleVelocities[i].y;

                    if (purplePositions.array[i * 3] < -distance || purplePositions.array[i * 3] > distance)
                        purpleVelocities[i].x = -purpleVelocities[i].x;

                    /**
                     * Pink
                     * @type {number}
                     */
                    pinkPositions.array[i * 3] += pinkVelocities[i].x / speed;
                    pinkPositions.array[i * 3 + 1] += pinkVelocities[i].y / speed;

                    if (pinkPositions.array[i * 3 + 1] < -distance || pinkPositions.array[i * 3 + 1] > distance)
                        pinkVelocities[i].y = -pinkVelocities[i].y;

                    if (pinkPositions.array[i * 3] < -distance || pinkPositions.array[i * 3] > distance)
                        pinkVelocities[i].x = -pinkVelocities[i].x;

                    /**
                     * Lilas
                     * @type {number}
                     */
                    lilasPositions.array[i * 3] += lilasVelocities[i].x / speed;
                    lilasPositions.array[i * 3 + 1] += lilasVelocities[i].y / speed;

                    if (lilasPositions.array[i * 3 + 1] < -distance || lilasPositions.array[i * 3 + 1] > distance)
                        lilasVelocities[i].y = -lilasVelocities[i].y;

                    if (lilasPositions.array[i * 3] < -distance || lilasPositions.array[i * 3] > distance)
                        lilasVelocities[i].x = -lilasVelocities[i].x;

                });

                purplePositions.needsUpdate = true;
                pinkPositions.needsUpdate = true;
                lilasPositions.needsUpdate = true;

            };

            return group;

        }

    }

}