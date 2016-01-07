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

            var maxParticleCount = 1000,
                radius = 50;

            var circleGeometry = new THREE.CircleGeometry(5, 12);

            var PointMaterial = new THREE.PointsMaterial({
                color: (new THREE.Color('red')).getHex(),
                size: 0.5,
                blending: THREE.AdditiveBlending,
                map: maps.particle,
                transparent: true,
                alphaTest: 0.01,
                sizeAttenuation: true

            });

            var PointMaterialBlur = new THREE.PointsMaterial({
                color: (new THREE.Color('yellow')).getHex(),
                size: 0.5,
                blending: THREE.AdditiveBlending,
                map: maps.particleBlur,
                transparent: true,
                alphaTest: 0.01,
                sizeAttenuation: true
            });

            var PointMaterialXBlur = new THREE.PointsMaterial({
                color: (new THREE.Color('blue')).getHex(),
                size: 0.5,
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

            data.layers.inner = new THREE.Points(particles, PointMaterial);

            var inner = new THREE.Points(particles, PointMaterial);

            var clone = particles.clone();
            clone.scale(4, 4, 4)
            data.layers.outer = new THREE.Points(clone, PointMaterialBlur);


            var clone = particles.clone();
            clone.scale(8, 8, 8)

            data.layers.out = new THREE.Points(clone, PointMaterialXBlur);

            return inner;
        }

    }

}