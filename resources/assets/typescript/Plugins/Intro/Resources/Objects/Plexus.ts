import { ObjectInterface } from "../../Interfaces/ObjectInterface";
import { extend } from "../../../../Helpers";
import { configureMaterial, resize, sprite, random } from "../../Helpers";
import { Forgable } from "../../Abstracts/Forgable";

/**
 * Character: Base
 */
export class Plexus extends Forgable implements ObjectInterface {

    get materials() {
        return {
            material: 'PointsMaterial'
        }
    }

    get defaults() {
        return {
            nodeStick: false,
            coreStick: false,
            coreRadius: 1500,//--1500,
            coreDistance: 20, //in percentage 20
            maxConnections: 2,
            connectionsMinDistance: 30, //in percentage
            nodeRadius: 300, //--300
            core: 50,//--50
            nodes: 20, //--20
            nodeDistance: 50, //--50 //in percentage 20
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

    /**
     * Create Object
     *
     * @param models
     * @param THREE.MeshBasicMaterial material
     * @returns {THREE.Group}
     */
    create(models, {material}) {

        let data = this.defaults,
            maps = material.userData

        let group = new THREE.Group(),
            hexicles = new THREE.BufferGeometry(),
            hexiclePositions = new Float32Array(data.hexicles * 3),
            hexicleMaterial = new THREE.PointsMaterial({
                map: maps.hexicle,
                size: 10,
                transparent: true,
                alphaTest: 0.1,
                sizeAttenuation: true,
                opacity: 0.2
            }),
            cores = new THREE.BufferGeometry(),
            corePositions = new Float32Array(data.core * 3),
            coreMaterial = new THREE.PointsMaterial({
                map: maps.core,
                size: 70,
                transparent: true,
                alphaTest: 0.5,
                fog: false,
                sizeAttenuation: true,
                blending: THREE.AdditiveBlending
            }),

            coreLines = new THREE.BufferGeometry(),
            coreLinePositions = new Float32Array((data.core * data.core * data.core) * 3 - data.core * 3),
            coreLineMaterial = new THREE.LineBasicMaterial({
                color: 0xb0f8ff,
                transparent: true,
                opacity: .3
            });

        /**
         * Hexicles
         */
        for (let i = 0; i < data.hexicles; i++) {

            let vector = random.vector3(0, 0, 0, data.hexiclesRadius, data.hexcleStick);

            hexiclePositions[i * 3] = vector.x;
            hexiclePositions[i * 3 + 1] = vector.y;
            hexiclePositions[i * 3 + 2] = vector.z;

            data.hexBag.push({
                position: vector,
                velocity: new THREE.Vector3(-1 + Math.random() * 2, -1 + Math.random() * 2, -1 + Math.random() * 2),
            })

        };

        /**
         * Core
         */
        for (let i = 0; i < data.core; i++) {

            /**
             * Regenerate each time they doesn't meet the min distance between each other
             */
            let vector = random.vector3(0, 0, 0, data.coreRadius, data.coreStick);

            let b = 1;

            while (b >= 1) {

                for (let j = 0; j < data.coreBag.length; j++) {
                    let distance = data.coreBag[j].position.distanceTo(vector);
                    if (distance <= data.coreDistance / 100 * data.coreRadius) {
                        vector = random.vector3(0, 0, 0, data.coreRadius, data.coreStick);
                        b++;
                    }
                };

                b--;

            }

            corePositions[i * 3] = vector.x;
            corePositions[i * 3 + 1] = vector.y;
            corePositions[i * 3 + 2] = vector.z;

            data.coreBag.push({
                position: vector,
                connections: 0
            });

        };

        /**
         * Nodes
         */
        let nodes = new THREE.BufferGeometry(),
            nodePositions = new Float32Array(3 * data.core + 3);
        nodes.drawRange.count = 1;
        nodes.drawRange.start = data.core;

        for (let i = 0; i < data.core; i++) {

            let nodeLines = new THREE.BufferGeometry(),
                nodeLinePositions = new Float32Array((data.nodes * 2) * 3),
                nodeLineMaterial = new THREE.LineDashedMaterial({
                    color: 0xffffff,
                    transparent: true,
                    dashSize: 1,
                    gapSize: 0.2,
                    opacity: 0.5
                }),
                index = 0;

            for (let j = 0; j < (data.nodeRandom ? random.between(1, data.nodes, true) : data.nodes); j++) {

                let nodeMaterial = new THREE.PointsMaterial({
                    size: 60,
                    //map: maps['point_' + (i + 1) + '_' + (j + 1)],
                    map: maps['point_' + random.between(1, 2, true) + '_' + random.between(1, 5, true)],
                    //map: maps.point_squad,
                    transparent: true,
                    alphaTest: 0.5,
                    sizeAttenuation: true,

                });

                let node = new THREE.Points(nodes, nodeMaterial),
                    vector = random.vector3(0, 0, 0, data.nodeRadius, data.nodeStick);

                let b = 1;

                while (b >= 1) {

                    for (let j = 0; j < data.nodesBag.length; j++) {

                        let distance = data.nodesBag[j].node.position.distanceTo(vector);
                        if (distance <= data.nodeDistance / 100 * data.nodeRadius) {
                            vector = random.vector3(random.between(-50, 50), random.between(-50, 50), random.between(-50, 50), data.nodeRadius, data.nodeStick);
                            b++;
                        }

                    };

                    b--;

                }

                nodePositions[i * 3] = corePositions[i * 3] + vector.x + 50
                nodePositions[i * 3 + 1] = corePositions[i * 3 + 1] + vector.y + 50
                nodePositions[i * 3 + 2] = corePositions[i * 3 + 2] + vector.z + 50

                node.position.set(
                    corePositions[i * 3] + vector.x,
                    corePositions[i * 3 + 1] + vector.y,
                    corePositions[i * 3 + 2] + vector.z
                );

                nodes.addAttribute('position', new THREE.BufferAttribute(nodePositions, 3).setDynamic(true));

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

            };

            /**
             * Lines
             */
            let vertexPos = 0;

            for (let i = 0; i < data.coreBag.length; i++) {

                for (let j = 0; j < data.coreBag.length; j++) {

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

                };

            };

            nodeLines.addAttribute('position', new THREE.BufferAttribute(nodeLinePositions, 3).setDynamic(true));
            nodeLines.addAttribute('lineDistance', new THREE.BufferAttribute(nodeLinePositions, 3).setDynamic(true));

            let nodeLine = new THREE.LineSegments(nodeLines, nodeLineMaterial);

            nodeLine.position.set(corePositions[i * 3], corePositions[i * 3 + 1], corePositions[i * 3 + 2]);

            group.add(nodeLine);

        };

        hexicles.addAttribute('position', new THREE.BufferAttribute(hexiclePositions, 3).setDynamic(true));
        cores.addAttribute('position', new THREE.BufferAttribute(corePositions, 3).setDynamic(true));
        coreLines.addAttribute('position', new THREE.BufferAttribute(coreLinePositions, 3).setDynamic(true));

        let hexicle = data.hex = new THREE.Points(hexicles, hexicleMaterial),
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

        group.position.setZ(-5000)

        group.userData = {
            data: data,
            update: this.update.bind(this, group)
        }

        this.test(group);

        return group;

    }

    public createMesh(geometry, material) {
        return new THREE.Points(geometry, material);
    }

    public update(plexus, time) {

        let hex = plexus.userData.data.hex,
            hexBag = plexus.userData.data.hexBag,
            hexPositions = hex.geometry.attributes.position,
            distance = 1000,
            speed = .5;

        for (let i = 0; i < hexPositions.count; i++) {

            hexPositions.array[i * 3] += hexBag[i].velocity.x * speed;
            hexPositions.array[i * 3 + 1] += hexBag[i].velocity.y * speed;
            hexPositions.array[i * 3 + 2] += hexBag[i].velocity.z * speed;

            if (hexPositions.array[i * 3 + 1] < -distance || hexPositions.array[i * 3 + 1] > distance)
                hexBag[i].velocity.y = -hexBag[i].velocity.y;

            if (hexPositions.array[i * 3] < -distance || hexPositions.array[i * 3] > distance)
                hexBag[i].velocity.x = -hexBag[i].velocity.x;

            if (hexPositions.array[i * 3 + 2] < -distance || hexPositions.array[i * 3 + 2] > distance)
                hexBag[i].velocity.z = -hexBag[i].velocity.z;

        };

        hexPositions.needsUpdate = true;

    }


    public test(group: THREE.Group) {

        group.add(new THREE.Mesh(
            new THREE.PlaneGeometry(100, 100)
        ))

    }

}
