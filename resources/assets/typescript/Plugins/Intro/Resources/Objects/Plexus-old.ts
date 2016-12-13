import { ObjectInterface } from "../../Interfaces/ObjectInterface";
import { extend } from "../../../../Helpers";
import { configureMaterial, configureTexture, resize, random } from "../../Helpers";
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
            maxConnections: 0,
            connectionsMinDistance: 30, //in percentage
            nodeRadius: 300, //--300
            core: 50,//--50
            nodes: 20, //--20
            nodeDistance: 50, //--50 //in percentage 20
            nodeRandom: false,
            nodesBag: [],
            coreBag: [],
            hexicles: 500,
            hexiclesRadius: 500,
            hexcleStick: false,
            hexBag: [],
            hex: null, //instance
            meta: require('json!../../../../../../../public/assets/movies.json')
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
            maps = material.userData,
            nodesCount = Object.keys(data.meta).length * 10

        let group = new THREE.Group(),
            hexicles = new THREE.BufferGeometry(),
            hexiclePositions = new Float32Array(data.hexicles * 3),
            hexicleMaterial = new THREE.PointsMaterial({
                // color: 0xb9214b,
                map: configureTexture(this.sprite, maps, 'hex'),
                size: 5,
                transparent: true,
                alphaTest: 0.01,
                fog: false,
                sizeAttenuation: true,
                opacity: 0.3
            }),
            cores = new THREE.BufferGeometry(),
            corePositions = new Float32Array(data.core * 3),
            coreMaterial = new THREE.PointsMaterial({
                map: configureTexture(this.sprite, maps, 'core'),
                size: 70,
                transparent: true,
                alphaTest: 0.00001,
                fog: false,
                sizeAttenuation: true,
                blending: THREE.AdditiveBlending
            }),

            coreLines = new THREE.BufferGeometry(),
            coreLinePositions = new Float32Array((data.core * data.core * data.core) * 3 - data.core * 3),
            coreLineMaterial = new THREE.LineBasicMaterial({
                color: 0x18b4e2,
                transparent: true,
                opacity: .3,
                blending: THREE.AdditiveBlending
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

        /**
         * Materials
         */
        let nodeMaterials = [];

        for (let key in data.meta) {

            let material = new THREE.PointsMaterial({
                size: 60,
                map: configureTexture(this.sprite, maps, key),
                transparent: true,
                alphaTest: 0.5,
                sizeAttenuation: true,
            })

            material['userData'] = data.meta[key];

            nodeMaterials.push(material);

        }

        for (let i = 0; i < data.core; i++) {

            if (!nodeMaterials.length) break;

            let nodeLines = new THREE.BufferGeometry(),
                nodeLinePositions = new Float32Array((nodesCount * 2) * 3),
                nodeLineMaterial = new THREE.LineDashedMaterial({
                    color: 0xffffff,
                    transparent: true,
                    dashSize: 1,
                    gapSize: 0.2,
                    opacity: 0.5,
                    blending: THREE.AdditiveBlending
                }),
                index = 0;

            /**
             * If its the last core... pick all u have
             */
            for (let j = 0; j < Math.floor(nodesCount / data.core); j++) {

                // let node = new THREE.Points(nodes, nodeMaterials.shift()),
                let node = new THREE.Points(nodes, nodeMaterials[random.between(1, 18, true)]),
                    vector = random.vector3(0, 0, 0, data.nodeRadius, data.nodeStick);

                let b = 1;

                while (b >= 1) {

                    for (let j = 0; j < data.nodesBag.length; j++) {

                        let distance = data.nodesBag[j].node.position.distanceTo(vector);
                        if (distance <= data.nodeDistance / 200 * data.nodeRadius) {
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


        /**
         * Create Rings
         */
        let geometry = new THREE.CircleGeometry(50, 50),
            rings = new THREE.Group()

        for (let i = 0; i < 3; i++) {

            let mesh = new THREE.Line(geometry, new THREE.LineBasicMaterial({
                opacity: 0.2,
                transparent: true
            }))

            mesh.scale.addScalar(i * i * 2);

            rings.add(mesh);

        }

        group.add(rings);

        // let geometry = new THREE.SphereBufferGeometry(10, 50, 50);
        // let sphereMaterial = new THREE.MeshBasicMaterial({
        //     // color: 0x2222ff,
        //     transparent: true,
        //     blending: THREE.AdditiveBlending,
        //     map: maps.tunnel,
        //     side: THREE.BackSide,
        //     depthTest: false,
        //     fog: false
        // }), 

        // let ringMaterial = new THREE.SpriteMaterial({
        //     // color: 0x2222ff,
        //     transparent: true,
        //     blending: THREE.AdditiveBlending,
        //     map: configureTexture(this.sprite, maps, 'ring'),
        //     depthTest: false,
        //     fog: false
        // })

        // for (let i = 0; i < data.core; i++) {

        //     group.add(
        //         this.createRing(
        //             new THREE.Vector3(
        //                 corePositions[i * 3],
        //                 corePositions[i * 3 + 1],
        //                 corePositions[i * 3 + 2],
        //             ), ringMaterial
        //         )
        //     )

        // }

        group.add(hexicle);
        group.add(core);
        group.add(coreLine);

        group.position.setZ(-5000)

        group.userData = {
            data: data,
            update: this.update.bind(this, group)
        }

        return group;

    }

    private rings: THREE.Sprite[] = [];

    private createRing(position: THREE.Vector3, ringMaterial) {

        let ring = new THREE.Sprite(ringMaterial);

        ring.name = 'ring'
        ring.scale.setScalar(30)
        ring.position.copy(position);

        /**
         * Push rings to be animated later
         */
        this.rings.push(ring)

        return ring;

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

        /**
         * Animate ring
         */

        // for (let ring of this.rings) {

        //     if (ring.material.opacity <= 0) {
        //         ring.scale.set(0, 0, 0)
        //         ring.material.opacity = 1
        //     } else {
        //         ring.scale.x += 0.5;
        //         ring.scale.y += 0.5;
        //         ring.material.opacity -= 0.0001
        //     }

        // }

    }

}
