module DreamsArk.Elements {

    import For = DreamsArk.Helpers.For;
    import random = DreamsArk.Helpers.random;

    export class Plexus2 implements Loadable {

        public instance:THREE.Object3D;

        data() {
            return {

                sets: {
                    1: {
                        particles: 10,
                        stick: false
                    },
                    2: {
                        particles: 15,
                        stick: true
                    },
                    3: {
                        particles: 25,
                        stick: true
                    },
                },

                core: 2,
                coreRadius: 100,

                nodeStick: false,
                coreStick: true,

                nodeRadius: 30,
                nodes: 20,
                nodeRandom: true,
                nodesBag: [],
                coreBag: [],
                hexicles: 1000,
                hexiclesRadius: 200,
                hexcleStick: true
            }
        }

        maps() {
            return {
                core: 'assets/hex-assets/hexicle.png',
                point_squad: 'lib/point-squad.png',
                hexicle: 'assets/hex-assets/hexicle.png',
                point_1_1: 'assets/hex-assets/point-1.png',
                point_1_2: 'assets/hex-assets/point-2.png',
                point_1_3: 'assets/hex-assets/point-3.png',
                point_1_4: 'assets/hex-assets/point-4.png',
                point_1_5: 'assets/hex-assets/point-5.png',
                point_2_1: 'assets/hex-assets/point-4.png',
                point_2_2: 'assets/hex-assets/point-3.png',
                point_2_3: 'assets/hex-assets/point-2.png',
                point_2_4: 'assets/hex-assets/point-1.png',
                point_2_5: 'assets/hex-assets/point-5.png',
            }
        }

        create(maps, objs, data) {

            var group = new THREE.Group(),
                cores = new THREE.BufferGeometry(),
                corePositions = new Float32Array(data.core * 3),
                coreMaterial = new THREE.PointsMaterial({
                    map: maps.core,
                    size: 10,
                    transparent: true,
                    alphaTest: 0.5,
                    sizeAttenuation: true,
                }),

                coreLines = new THREE.BufferGeometry(),
                coreLinePositions = new Float32Array((data.core * 2) * 3 - data.core),
                coreLineMaterial = new THREE.LineBasicMaterial({
                    color: 0xffffff,
                    transparent: true,
                    opacity: 0.8
                });

            /**
             * Core
             */
            For(data.core, function (i) {

                var vector = random.vector3(0, 0, 0, data.coreRadius, data.coreStick);

                corePositions[i * 3] = vector.x;
                corePositions[i * 3 + 1] = vector.y;
                corePositions[i * 3 + 2] = vector.z;

            });

            /**
             * Lines
             */
            var index = 0;

            For(data.core - 1, function (i) {

                coreLinePositions[(i + index) * 3] = corePositions[(i) * 3];
                coreLinePositions[(i + index) * 3 + 1] = corePositions[(i) * 3 + 1];
                coreLinePositions[(i + index) * 3 + 2] = corePositions[(i) * 3 + 2];

                coreLinePositions[((i + index) + 1) * 3] = corePositions[(i + 1) * 3];
                coreLinePositions[((i + index) + 1) * 3 + 1] = corePositions[(i + 1) * 3 + 1];
                coreLinePositions[((i + index) + 1) * 3 + 2] = corePositions[(i + 1) * 3 + 2];

                index++

            });

            cores.addAttribute('position', new THREE.BufferAttribute(corePositions, 3).setDynamic(true));
            coreLines.addAttribute('position', new THREE.BufferAttribute(coreLinePositions, 3).setDynamic(true));

            var core = new THREE.Points(cores, coreMaterial),
                coreLine = new THREE.LineSegments(coreLines, coreLineMaterial);

            group.add(core);
            group.add(coreLine);

            return group;

        }

    }

}