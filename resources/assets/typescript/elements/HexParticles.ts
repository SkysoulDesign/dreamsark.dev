module DreamsArk.Elements {

    import deg2rad = DreamsArk.Helpers.deg2rad;
    import random = DreamsArk.Helpers.random;
    import For = DreamsArk.Helpers.For;
    import Browser = DreamsArk.Modules.Browser;

    export class HexParticles implements Loadable {

        public instance:THREE.Object3D;

        data() {
            return {
                velocity: [],
                layers: {}
            }
        }

        maps():{} {
            return {
                particle: 'lib/hex.png',
                particleBlur: 'lib/hex-blur.png',
                particleXBlur: 'lib/hex-x-blur.png'
            }
        }

        objs():{} {
            return {
                hex: 'models/hex.obj',
            }
        }

        create(maps, objs, data) {

            var maxParticleCount = 2000,
                radius = 50,
                group = new THREE.Group();

            var circleGeometry = new THREE.CircleGeometry(5, 12);

            var PointMaterial = new THREE.PointsMaterial({
                //color: (new THREE.Color('red')).getHex(),
                size: 0.5,
                blending: THREE.AdditiveBlending,
                map: maps.particle,
                transparent: true,
                alphaTest: 0.01,
                sizeAttenuation: true

            });

            var PointMaterialBlur = new THREE.PointsMaterial({
                //color: (new THREE.Color('yellow')).getHex(),
                size: 0.3,
                blending: THREE.AdditiveBlending,
                map: maps.particleBlur,
                transparent: true,
                alphaTest: 0.01,
                sizeAttenuation: true
            });

            var PointMaterialXBlur = new THREE.PointsMaterial({
                //color: (new THREE.Color('blue')).getHex(),
                size: 0.2,
                blending: THREE.AdditiveBlending,
                map: maps.particleXBlur,
                transparent: true,
                alphaTest: 0.01,
                sizeAttenuation: true
            });

            var particles = new THREE.BufferGeometry();
            var particlePositions = new Float32Array(maxParticleCount * 3);

            /**
             * Add Vertices to Points
             */
            For(maxParticleCount, function (i) {

                //var vector = random.vector3(0, 0, 0, radius, true);
                var vector = circleGeometry.vertices[random.between(1, circleGeometry.vertices.length - 2)];

                particlePositions[i * 3] = vector.x + Math.random() * 2;
                particlePositions[i * 3 + 1] = vector.y + Math.random() * 2;
                particlePositions[i * 3 + 2] = vector.z + Math.random() * 2;

                data.velocity.push(
                    new THREE.Vector3(5 * Math.random(), 5 * Math.random(), 5 * Math.random())
                );

            });

            particles.addAttribute('position', new THREE.BufferAttribute(particlePositions, 3).setDynamic(true));

            particles.scale(2, 2, 2);
            data.layers.inner = new THREE.Points(particles, PointMaterial);

            var clone = particles.clone();
            clone.scale(2, 2, 2);
            data.layers.outer = new THREE.Points(clone, PointMaterialBlur);

            var clone = particles.clone();
            clone.scale(4, 4, 4);

            data.layers.out = new THREE.Points(clone, PointMaterialXBlur);

            /**
             * Rotate Them
             */
            data.layers.inner.rotation.x = data.layers.out.rotation.x = data.layers.outer.rotation.x = deg2rad(90);

            group.add(data.layers.inner);
            group.add(data.layers.out);
            group.add(data.layers.outer);

            data.update = function () {

                /**
                 * Anim particles
                 */
                var particles = group,//elements.HexParticles,
                    particlesPositions = data.layers.inner.geometry.attributes.position,
                    particlesBlurPositions = data.layers.outer.geometry.attributes.position,
                    particlesBlurOutPositions = data.layers.out.geometry.attributes.position,
                    particlesVelocities = particles.userData.velocity;

                //particles.position.y = camera.position.y;

                For(particlesPositions.count, function (i) {

                    if (particlesPositions.array[i * 3 + 2] > 80)
                        particlesPositions.array[i * 3 + 2] = -80;

                    if (particlesBlurPositions.array[i * 3 + 2] > 80)
                        particlesBlurPositions.array[i * 3 + 2] = -80;

                    if (particlesBlurOutPositions.array[i * 3 + 2] > 80)
                        particlesBlurOutPositions.array[i * 3 + 2] = -80;

                    particlesPositions.array[i * 3 + 2] += particlesVelocities[i].z / 2;
                    particlesBlurPositions.array[i * 3 + 2] += particlesVelocities[i].z / 10;
                    particlesBlurOutPositions.array[i * 3 + 2] += particlesVelocities[i].z / 10;

                });

                particlesPositions.needsUpdate = true;
                particlesBlurPositions.needsUpdate = true;
                particlesBlurOutPositions.needsUpdate = true;

            };

            return group;

        }

    }

}