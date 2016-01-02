module DreamsArk.Elements {

    import For = DreamsArk.Helpers.For;
    import random = DreamsArk.Helpers.random;

    export class Plexus implements Loadable {

        public instance:THREE.Object3D;

        data() {
            return {
                nodeStick: false,
                coreStick: false,
                coreRadius: 300,
                coreDistance: 15, //in percentage 20
                maxConnections: 2,
                connectionsMinDistance: 30, //in percentage
                nodeRadius: 30, //50
                core: 50,
                nodes: 20,
                nodeDistance: 15, //in percentage 20
                nodeRandom: true,
                nodesBag: [],
                coreBag: [],
                hexicles: 500,
                hexiclesRadius: 500,
                hexcleStick: false,
                hexBag: [],
                hex: null, //instance
            }
        }

        maps() {
            return {
                core: 'assets/hex-assets/hex.png',
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
                hexicles = new THREE.BufferGeometry(),
                hexiclePositions = new Float32Array(data.hexicles * 3),
                hexicleMaterial = new THREE.PointsMaterial({
                    map: maps.hexicle,
                    size: 2,
                    transparent: true,
                    alphaTest: 0.1,
                    sizeAttenuation: true,
                    opacity: 0.2
                }),
                cores = new THREE.BufferGeometry(),
                corePositions = new Float32Array(data.core * 3),
                coreMaterial = new THREE.PointsMaterial({
                    map: maps.core,
                    size: 5,
                    transparent: true,
                    alphaTest: 0.5,
                    sizeAttenuation: true,
                }),

                coreLines = new THREE.BufferGeometry(),
                coreLinePositions = new Float32Array((data.core * data.core * data.core) * 3 - data.core),
                coreLineMaterial = new THREE.LineBasicMaterial({
                    color: 0xffffff,
                    transparent: true,
                    opacity: 0.2
                });

            /**
             * Hexicles
             */
            For(data.hexicles, function (i) {

                var vector = random.vector3(0, 0, 0, data.hexiclesRadius, data.hexcleStick);

                hexiclePositions[i * 3] = vector.x;
                hexiclePositions[i * 3 + 1] = vector.y;
                hexiclePositions[i * 3 + 2] = vector.z;

                data.hexBag.push({
                    position: vector,
                    velocity: new THREE.Vector3(-1 + Math.random() * 2, -1 + Math.random() * 2, -1 + Math.random() * 2),
                })

            });

            /**
             * Core
             */
            For(data.core, function (i) {

                /**
                 * Regenerate each time they doesn't meet the min distance between each other
                 */
                var vector = random.vector3(0, 0, 0, data.coreRadius, data.coreStick);

                var b = 1;

                while (b >= 1) {

                    For(data.coreBag.length, function (j) {
                        var distance = data.coreBag[j].position.distanceTo(vector);
                        if (distance <= data.coreDistance / 100 * data.coreRadius) {
                            vector = random.vector3(0, 0, 0, data.coreRadius, data.coreStick);
                            b++;
                        }
                    });

                    b--;

                }

                corePositions[i * 3] = vector.x;
                corePositions[i * 3 + 1] = vector.y;
                corePositions[i * 3 + 2] = vector.z;

                data.coreBag.push({
                    position: vector,
                    connections: 0
                });

            });

            /**
             * Nodes
             */
            For(data.core, function (i) {

                var nodeLines = new THREE.BufferGeometry(),
                    nodeLinePositions = new Float32Array((data.nodes * 2) * 3),
                    nodeLineMaterial = new THREE.LineDashedMaterial({
                        color: 0xffffff,
                        transparent: true,
                        dashSize: 1,
                        gapSize: 0.2,
                        opacity: 0.5
                    }),
                    index = 0;

                For(data.nodeRandom ? random.between(1, data.nodes) : data.nodes, function (j) {

                    var nodes = new THREE.BufferGeometry(),
                        nodePositions = new Float32Array(3),
                        nodeMaterial = new THREE.PointsMaterial({
                            size: 5,
                            //map: maps['point_' + (i + 1) + '_' + (j + 1)],
                            map: maps['point_' + random.between(1, 2) + '_' + random.between(1, 5)],
                            //map: maps.point_squad,
                            transparent: true,
                            alphaTest: 0.5,
                            sizeAttenuation: true,

                        });

                    nodes.addAttribute('position', new THREE.BufferAttribute(nodePositions, 3).setDynamic(true));

                    var node = new THREE.Points(nodes, nodeMaterial),
                        vector = random.vector3(0, 0, 0, data.nodeRadius, data.nodeStick);

                    var b = 1;

                    while (b >= 1) {

                        For(data.nodesBag.length, function (j) {
                            var distance = data.nodesBag[j].node.position.distanceTo(vector);
                            if (distance <= data.nodeDistance / 100 * data.nodeRadius) {
                                vector = random.vector3(random.between(-50, 50), random.between(-50, 50), random.between(-50, 50), data.nodeRadius, data.nodeStick);
                                b++;
                            }
                        });

                        b--;

                    }

                    node.position.set(
                        corePositions[i * 3] + vector.x,
                        corePositions[i * 3 + 1] + vector.y,
                        corePositions[i * 3 + 2] + vector.z
                    );

                    nodeLinePositions[(j + index + 1) * 3] = vector.x;
                    nodeLinePositions[(j + index + 1) * 3 + 1] = vector.y;
                    nodeLinePositions[(j + index + 1) * 3 + 2] = vector.z;

                    index++;

                    /**
                     * Save Reference
                     */
                    data.nodesBag.push({
                        node: node,
                        line: nodeLinePositions
                    });

                    group.add(node);

                });

                /**
                 * Lines
                 */
                var vertexPos = 0;

                For(data.coreBag.length, function (i) {

                    For(data.coreBag.length, function (j) {

                        if (data.coreBag[i].connections <= data.maxConnections - 1)
                            if (data.coreBag[i].position.distanceTo(data.coreBag[j].position) <= data.connectionsMinDistance / 100 * data.coreRadius) {

                                coreLinePositions[vertexPos++] = corePositions[i * 3];
                                coreLinePositions[vertexPos++] = corePositions[i * 3 + 1];
                                coreLinePositions[vertexPos++] = corePositions[i * 3 + 2];

                                coreLinePositions[vertexPos++] = corePositions[(j) * 3];
                                coreLinePositions[vertexPos++] = corePositions[(j) * 3 + 1];
                                coreLinePositions[vertexPos++] = corePositions[(j) * 3 + 2];

                                data.coreBag[i].connections++;
                                data.coreBag[j].connections++;

                            }

                    });


                });

                nodeLines.addAttribute('position', new THREE.BufferAttribute(nodeLinePositions, 3).setDynamic(true));
                nodeLines.addAttribute('lineDistance', new THREE.BufferAttribute(nodeLinePositions, 3).setDynamic(true));

                var nodeLine = new THREE.LineSegments(nodeLines, nodeLineMaterial);

                nodeLine.position.set(corePositions[i * 3], corePositions[i * 3 + 1], corePositions[i * 3 + 2]);

                group.add(nodeLine);

            });

            hexicles.addAttribute('position', new THREE.BufferAttribute(hexiclePositions, 3).setDynamic(true));
            cores.addAttribute('position', new THREE.BufferAttribute(corePositions, 3).setDynamic(true));
            coreLines.addAttribute('position', new THREE.BufferAttribute(coreLinePositions, 3).setDynamic(true));

            var hexicle = data.hex = new THREE.Points(hexicles, hexicleMaterial),
                core = new THREE.Points(cores, coreMaterial),
                coreLine = new THREE.LineSegments(coreLines, coreLineMaterial);

            ///**
            // * Save Reference
            // */
            //data.coreBag.push({
            //    cores: core,
            //    lines: coreLine
            //});

            group.add(hexicle);
            group.add(core);
            group.add(coreLine);

            return group;

        }

    }

}