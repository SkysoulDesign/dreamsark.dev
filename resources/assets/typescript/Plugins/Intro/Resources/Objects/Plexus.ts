import { ObjectInterface } from "../../Interfaces/ObjectInterface";
import { Forgable } from "../../Abstracts/Forgable";
import { random, deg2rad, configureTexture } from "../../Helpers";
import { extend } from "../../../../Helpers";

interface Vector3 {
    x: number;
    y: number;
    z: number;
}

/**
 * Plexus
 */
export class Plexus extends Forgable implements ObjectInterface {

    get materials() {
        return {
            material: 'IntroDefaultMaterial'
        }
    }

    private maps;
    private nodesBag = [];

    private options = {
        cores: {
            safe: true,
            maxDistance: 600,
            amount: 15,
            height: 150,
            nodes: {
                meta: require('json!../../../../../../../public/assets/movies.json'),
                amount: 4,
                sphere: false,
                radius: 200,
                safe: true,
                maxDistance: 50,
                line: {
                    material: {
                        color: 'white',
                        transparent: true,
                        opacity: 0.1,
                        linewidth: 1,
                        fog: true
                    }
                },
                core: {
                    material: {
                        size: 50,
                        fog: false
                    }
                },
                material: {
                    size: 50,
                    fog: true
                }
            },
            line: {
                colors: [0xe4a500, 0x3eafe4, 0x3eafe4, 0xe4a500], // from bottom to top
                material: {
                    // color: 0x051cf4,
                    linewidth: 1,
                    transparent: true,
                    opacity: 0.3,
                    fog: true
                },
                margin: {
                    top: 7,
                    bottom: 2
                }
            },
            material: {
                size: 50,
                fog: false
                // color: 'white'
                // blending: THREE.AdditiveBlending,
            }
        },
        debris: {
            amount: 600 * 2,
            position: {
                x: 100,
                y: 100,
                z: 50
            },
            material: {
                size: 10,
                fog: false
                // color: new THREE.Color('yellow'),
            }
        },
        particles: {
            amount: 500,
            radius: 4000,
            material: {
                color: 'white',
                size: 5,
                fog: false
            }
        }
    }

    create(models, {material}) {

        let group = new THREE.Group();

        /**
         * Save raw sprites
         */
        this.maps = material.userData;

        let geometry = this.getSpiralGeometry(),
            buffer = new THREE.BufferGeometry(),
            positions = new Float32Array((geometry.length / 2) * 3);

        for (let i = 0; i < geometry.length / 2; i++) {

            positions[i * 3 + 0] = geometry[i * 2];
            positions[i * 3 + 1] = 0;
            positions[i * 3 + 2] = geometry[i * 2 + 1];

        }

        buffer.addAttribute('position', new THREE.BufferAttribute(positions, 3).setDynamic(true));

        let debris = this.createDebris(positions, this.options.debris),
            core = this.createCores(debris.geometry['attributes'].position, this.options.cores),
            particles = this.createParticles(this.options.particles);

        let haze = this.forge('haze', material, {
            rotation: {
                x: 90, y: 0, z: 0
            }
        })

        haze['material'].side = THREE.DoubleSide;
        haze['material'].blending = THREE.AdditiveBlending;
        haze['material'].opacity = .025;
        haze['material'].transparent = true;
        haze['material'].depthTest = false;
        haze['material'].fog = true;
        haze.scale.setScalar(10.19);
        haze.position.set(0, 0, 0);


        let smallHaze = haze.clone();
        smallHaze.scale.setScalar(.19);
        smallHaze['material'] = haze['material'].clone()

        smallHaze['material'].opacity = 0.05

        group.add(debris)
        group.add(core)
        group.add(haze)
        group.add(smallHaze)
        group.add(particles)

        group.userData = {
            particles: particles,
            materials: core.userData.materials.concat(debris.material),
            nodesBag: this.nodesBag,
            update: this.update.bind(this, group),
            rotate: true
        };

        group.position.setZ(-5000);

        return group;

    }

    public update(group: THREE.Group, anim, time, delta) {

        if (group.userData.rotate)
            group.rotation.y += 0.0001

        let particles = group.userData.particles,
            positions = particles.geometry.attributes.position,
            hexBag = particles.userData.bag,
            distance = 1000,
            speed = .5;

        for (let i = 0; i < positions.count; i++) {

            positions.array[i * 3] += hexBag[i].velocity.x * speed;
            positions.array[i * 3 + 1] += hexBag[i].velocity.y * speed;
            positions.array[i * 3 + 2] += hexBag[i].velocity.z * speed;

            if (positions.array[i * 3 + 1] < -distance || positions.array[i * 3 + 1] > distance)
                hexBag[i].velocity.y = -hexBag[i].velocity.y;

            if (positions.array[i * 3] < -distance || positions.array[i * 3] > distance)
                hexBag[i].velocity.x = -hexBag[i].velocity.x;

            if (positions.array[i * 3 + 2] < -distance || positions.array[i * 3 + 2] > distance)
                hexBag[i].velocity.z = -hexBag[i].velocity.z;

        };

        positions.needsUpdate = true;

    }

    public createNodes(corePosition: Vector3, materials: THREE.PointsMaterial[]): THREE.Group {

        const {amount, radius, sphere, maxDistance, material, line} = this.options.cores.nodes;

        let group = new THREE.Group(),
            segment = new THREE.BufferGeometry(),
            segmentPositions = new Float32Array(3 * amount * 2);

        let positionsBag: Vector3[] = [{ x: 0, y: 0, z: 0 }];

        for (let i = 0; i < amount; i++) {

            let node = new THREE.BufferGeometry(),
                nodePositions = new Float32Array(6); // at least two points or raycaster can't detect

            let vector = positionsBag[i + 1] = this.getPosition(
                () => random.vector3(0, 0, 0, radius, sphere), positionsBag, maxDistance
            );

            nodePositions[0] = segmentPositions[i * 6 + 0] = corePosition.x;
            nodePositions[1] = segmentPositions[i * 6 + 1] = corePosition.y;
            nodePositions[2] = segmentPositions[i * 6 + 2] = corePosition.z;

            nodePositions[3] = segmentPositions[i * 6 + 3] = vector.x + corePosition.x;
            nodePositions[4] = segmentPositions[i * 6 + 4] = vector.y + corePosition.y;
            nodePositions[5] = segmentPositions[i * 6 + 5] = vector.z + corePosition.z;

            node.drawRange.count = 1;
            node.drawRange.start = 1;

            node.addAttribute('position', new THREE.BufferAttribute(nodePositions, 3).setDynamic(true));

            group.add(
                new THREE.Points(node, materials[random.between(0, materials.length - 1, true)])
            )

        }

        /**
         * Store every node for raytracing later
         */
        this.nodesBag.push(...group.children);

        segment.addAttribute('position', new THREE.BufferAttribute(segmentPositions, 3));

        group.add(new THREE.LineSegments(
            segment, new THREE.LineBasicMaterial(extend({}, line.material)))
        );

        return group;

    }

    public createCores(positions: THREE.BufferAttribute, options): THREE.Group {

        const {amount, height, nodes, maxDistance, safe} = options;

        let group = new THREE.Group(),
            lineMaterial = new THREE.LineBasicMaterial(extend({
                vertexColors: THREE.VertexColors
            }, options.line.material)),
            coreNodeMaterial = new THREE.PointsMaterial(extend({
                map: configureTexture(this.sprite, this.maps, 'core'),
                alphaTest: 0.00001,
                transparent: true,
            }, options.nodes.core.material)),
            coreMaterial = new THREE.PointsMaterial(extend({
                map: configureTexture(this.sprite, this.maps, 'blue-core'),
                alphaTest: 0.00001,
                transparent: true,
            }, options.material));


        /**
         * Parse Node Materials
         */
        let nodeMaterials = [];

        for (let key in nodes.meta) {

            let mat = new THREE.PointsMaterial(extend({
                size: 60,
                map: configureTexture(this.sprite, this.maps, key),
                transparent: true,
                alphaTest: 0.5,
                sizeAttenuation: true,
            }, nodes.material))

            mat['userData'] = nodes.meta[key];

            nodeMaterials.push(mat);

        }

        let core = new THREE.BufferGeometry(),
            corePositions = new Float32Array(amount * 3),
            coreNode = new THREE.BufferGeometry(),
            coreNodePositions = new Float32Array(amount * 3),
            line = new THREE.BufferGeometry(),
            linePositions = new Float32Array(3 * amount * 4), // 4 number of line points 2*2
            lineColors = new Float32Array(3 * amount * 4);    // 4 number of line points 2*2

        let color = new THREE.Color();

        /**
         * Keep an eye on the distance of each core
         */
        let coresDistances = [];

        for (let i = 0; i < amount; i++) {

            let masterHeight = Math.random() > 0.5 ? height : -height;

            let position = coresDistances[i] = this.pickPoint(positions, coresDistances, maxDistance, safe);

            corePositions[i * 3 + 0] = position.x;
            corePositions[i * 3 + 1] = position.y + masterHeight;
            corePositions[i * 3 + 2] = position.z;

            /**
             * Bottom Top
             */
            linePositions[i * 12 + 0] = position.x;
            linePositions[i * 12 + 1] = position.y + options.line.margin.bottom;
            linePositions[i * 12 + 2] = position.z;

            linePositions[i * 12 + 3] = position.x;
            linePositions[i * 12 + 4] = position.y + masterHeight - options.line.margin.top;
            linePositions[i * 12 + 5] = position.z;

            /**
             * Top Up
             */
            linePositions[i * 12 + 6] = linePositions[i * 12 + 3];
            linePositions[i * 12 + 7] = position.y + masterHeight + options.line.margin.top;
            linePositions[i * 12 + 8] = linePositions[i * 12 + 5];

            linePositions[i * 12 + 9] = linePositions[i * 12 + 0];
            linePositions[i * 12 + 10] = position.y + masterHeight * 2;
            linePositions[i * 12 + 11] = linePositions[i * 12 + 2];

            /**
             * Node final position
             */
            let x, y, z;

            coreNodePositions[i * 3 + 0] = x = linePositions[i * 12 + 9];
            coreNodePositions[i * 3 + 1] = y = linePositions[i * 12 + 10];
            coreNodePositions[i * 3 + 2] = z = linePositions[i * 12 + 11];

            group.add(
                this.createNodes({ x, y, z }, nodeMaterials)
            );

            options.line.colors.forEach((hex, index) => {

                color.set(hex);

                lineColors[i * 12 + index * 3 + 0] = color.r;
                lineColors[i * 12 + index * 3 + 1] = color.g;
                lineColors[i * 12 + index * 3 + 2] = color.b;

            })

        }

        core.addAttribute('position', new THREE.BufferAttribute(corePositions, 3));
        coreNode.addAttribute('position', new THREE.BufferAttribute(coreNodePositions, 3));
        line.addAttribute('position', new THREE.BufferAttribute(linePositions, 3));
        line.addAttribute('color', new THREE.BufferAttribute(lineColors, 3));

        group.add(new THREE.Points(core, coreMaterial));
        group.add(new THREE.Points(coreNode, coreNodeMaterial));
        group.add(new THREE.LineSegments(line, lineMaterial));

        group.userData.materials = nodeMaterials.concat(coreMaterial, coreNodeMaterial, lineMaterial)

        return group;

    }

    public createDebris(spiral: Float32Array, options): THREE.Points {

        const {amount, material} = options;

        let positions = new Float32Array(amount * 3),
            geometry = new THREE.BufferGeometry();

        for (let i = 0; i < amount; i++) {

            let point = random.between(0, (spiral.length / 3) - 1, true);

            let vector = spiral.slice(point * 3, point * 3 + 3),
                {x, y, z} = options.position;

            positions[i * 3 + 0] = vector[0] + Math.random() * random.between(-x, x);
            positions[i * 3 + 1] = vector[1] + Math.random() * random.between(-y, y);
            positions[i * 3 + 2] = vector[2] + Math.random() * random.between(-z, z);

        }

        geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));

        return new THREE.Points(geometry, new THREE.PointsMaterial(
            extend({
                map: configureTexture(this.sprite, this.maps, 'galaxy-debri'),
                alphaTest: 0.00001,
                transparent: true,
                blending: THREE.AdditiveBlending,
                depthTest: false,
            }, material)
        ))

    }

    public createParticles(options): THREE.Points {

        let { amount, radius, sphere, material } = options;

        let positions = new Float32Array(amount * 3),
            geometry = new THREE.BufferGeometry(),
            bag = [];


        /**
         * Hexicles
         */
        for (let i = 0; i < amount; i++) {

            let vector = random.vector3(0, 0, 0, radius, sphere);

            positions[i * 3] = vector.x;
            positions[i * 3 + 1] = vector.y;
            positions[i * 3 + 2] = vector.z;

            bag.push({
                position: vector,
                velocity: new THREE.Vector3(-1 + Math.random() * 2, -1 + Math.random() * 2, -1 + Math.random() * 2),
            })

        };

        geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3).setDynamic(true));

        let particles = new THREE.Points(geometry, new THREE.PointsMaterial(
            extend({
                blending: THREE.AdditiveBlending,
                opacity: 0.3,
                alphaTest: 0.001
            }, material)));

        particles.userData = {
            bag: bag
        }

        return particles;

    }

    /**
     * safe = true will decress length gradually until it can fit everything... 
     * otherwise it will crash if not able to fit all nodes due forever loop
     */
    private pickPoint(positions: THREE.BufferAttribute, collection: Vector3[], maxDistance: number, safe?: boolean): Vector3 {

        return this.getPosition(() => {

            let point = random.between(0, positions.count, true),
                position = point - (point % 3);

            return {
                x: positions.array[position++],
                y: positions.array[position++],
                z: positions.array[position++]
            }

        }, collection, maxDistance, safe);

    }

    private getPosition(destination: () => Vector3, collection: Vector3[], maxDistance: number, safe: boolean = false, attemps = 0): Vector3 {

        let origin = destination();

        for (let item of collection) {

            let distance = this.distanceTo(origin, item);

            if (distance < maxDistance || ((origin.x === item.x) && (origin.y === item.y) && (origin.z === item.z))) {
                return this.getPosition(
                    destination, collection,
                    safe ? attemps > 50 ? maxDistance -= 1 : maxDistance : maxDistance, safe,
                    attemps + 1
                )
            }

        }

        return origin;

    }

    private distanceTo(v1: Vector3, v2: Vector3) {
        const x = v2.x - v1.x, y = v2.y - v1.y, z = v2.z - v1.z;
        return Math.sqrt(x * x + y * y + z * z);
    }

    private getSpiralGeometry() {

        return [
            -0.5239, -1612.6000,
            -17.2049, -1609.0800,
            -52.4554, -1602.0300,
            -112.4650, -1590.2800,
            -195.0810, -1572.8101,
            -298.1500, -1548.5900,
            -419.5170, -1516.6100,
            -557.0290, -1475.8300,
            -704.6930, -1426.1400,
            -856.5130, -1367.4200,
            -1006.5000, -1299.5500,
            -1148.6500, -1222.4100,
            -1281.5900, -1136.8101,
            -1403.9301, -1043.5500,
            -1514.3101, -943.4260,
            -1611.3300, -837.2550,
            -1694.6000, -725.9910,
            -1763.6899, -610.5940,
            -1818.2100, -492.0230,
            -1857.7400, -371.2350,
            -1882.3700, -249.2080,
            -1892.1600, -126.9150,
            -1887.1899, -5.3321,
            -1867.5400, 114.5660,
            -1833.7300, 231.9110,
            -1786.2900, 345.8360,
            -1725.7500, 455.4700,
            -1652.6100, 559.9480,
            -1567.7800, 658.6090,
            -1472.1200, 750.7930,
            -1366.5200, 835.8410,
            -1251.8700, 913.0930,
            -1129.2700, 982.1700,
            -999.8350, 1042.6899,
            -864.6630, 1094.2800,
            -724.8670, 1136.5601,
            -581.6290, 1169.4500,
            -436.1310, 1192.8900,
            -289.5540, 1206.8101,
            -143.0820, 1211.1400,
            2.1827, 1206.1000,
            145.1360, 1191.9399,
            284.6760, 1168.8700,
            419.6970, 1137.1300,
            549.3080, 1097.2000,
            672.6160, 1049.5601,
            788.7270, 994.6940,
            896.7500, 933.0850,
            996.1030, 865.3870,
            1086.2000, 792.2560,
            1166.4700, 714.3490,
            1236.3101, 632.3220,
            1295.5200, 546.9110,
            1343.8700, 458.8520,
            1381.1300, 368.8830,
            1407.1000, 277.7390,
            1421.9000, 186.1390,
            1425.6899, 94.8017,
            1418.6000, 4.4452,
            1400.7700, -84.2120,
            1372.6801, -170.5580,
            1334.7700, -253.9800,
            1287.5200, -333.8670,
            1231.3800, -409.6050,
            1167.0500, -480.7610,
            1095.2200, -546.8970,
            1016.6100, -607.5790,
            931.8990, -662.3720,
            841.9220, -711.0550,
            747.5060, -753.4110,
            649.4790, -789.2220,
            548.6680, -818.2670,
            445.9170, -840.5550,
            342.0660, -856.0950,
            237.9590, -864.8950,
            134.4370, -866.9620,
            32.2495, -862.5120,
            -67.8539, -851.7600,
            -165.1240, -834.9210,
            -258.8120, -812.2090,
            -348.3500, -784.0000,
            -433.1700, -750.6710,
            -512.7050, -712.5960,
            -586.3870, -670.1530,
            -653.8850, -623.8140,
            -714.8670, -574.0530,
            -769.0030, -521.3450,
            -815.9620, -466.1640,
            -855.6680, -409.0100,
            -888.0470, -350.3860,
            -913.0240, -290.7930,
            -930.5260, -230.7320,
            -940.7170, -170.6660,
            -943.7630, -111.0560,
            -939.8310, -52.3651,
            -929.0860, 4.9447,
            -911.8890, 60.5077,
            -888.5980, 113.9580,
            -859.5740, 164.9290,
            -825.1760, 213.0560,
            -785.8900, 258.1050,
            -742.2000, 299.8450,
            -694.5930, 338.0400,
            -643.5530, 372.4600,
            -589.6120, 403.0200,
            -533.3030, 429.6360,
            -475.1570, 452.2240,
            -415.7070, 470.7000,
            -355.4560, 485.1220,
            -294.9070, 495.5490,
            -234.5620, 502.0380,
            -174.9260, 504.6480,
            -116.4050, 503.5540,
            -59.4099, 498.9300,
            -4.3485, 490.9520,
            48.3703, 479.7950,
            98.4751, 465.7110,
            145.6940, 448.9520,
            189.7570, 429.7700,
            230.3910, 408.4190,
            267.4820, 385.1810,
            300.9140, 360.3410,
            330.5730, 334.1830,
            356.3430, 306.9910,
            378.2590, 279.0360,
            396.3560, 250.5900,
            410.6680, 221.9240,
            421.2310, 193.3080,
            428.2010, 164.9640,
            431.7350, 137.1140,
            431.9920, 109.9770,
            429.1270, 83.7752,
            423.3770, 58.6546,
            414.9790, 34.7618,
            404.1700, 12.2431,
            391.1850, -8.7551,
            376.2920, -28.1707,
            359.7570, -45.9413,
            341.8460, -62.0048,
            322.8260, -76.2989,
            302.9470, -88.8400,
            282.4590, -99.6445,
            261.6110, -108.7290,
            240.6530, -116.1090,
            219.7800, -121.8630,
            199.1880, -126.0670,
            179.0710, -128.7990,
            159.6240, -130.1360,
            140.9660, -130.1900,
            123.2170, -129.0720,
            106.4940, -126.8940,
            90.9170, -123.7690,
            76.5228, -119.8130,
            63.3495, -115.1450,
            51.4348, -109.8810,
            40.8164, -104.1410,
            31.4631, -98.0206,
            23.3435, -91.6187,
            16.4264, -85.0327,
            10.6805, -78.3605,
            6.0285, -71.6618,
            2.3933, -64.9966,
            -0.3022, -58.4247,
            -2.1354, -52.0059,
            -3.0648, -45.8599,
            -3.0493, -40.1063,
            -2.0475, -34.8646,
            -0.0183, -30.2545,
            1.9460, -25.5600,
            2.7531, -20.0652,
            3.9163, -5.0067,
            5.3605, 9.5420,
            11.4895, 23.8015,
            15.2296, 29.1418,
            20.3424, 32.5867,
            25.7009, 35.8236,
            30.1781, 40.5399,
            33.7460, 46.4715,
            36.3762, 53.3538,
            38.0407, 60.9227,
            38.7111, 68.9138,
            38.2707, 77.2634,
            36.6026, 85.9076,
            33.5900, 94.7827,
            29.1161, 103.8250,
            23.1146, 112.9180,
            15.5192, 121.9470,
            6.2637, 130.7940,
            -4.7182, 139.3460,
            -17.4120, 147.4530,
            -31.8032, 154.9680,
            -47.8771, 161.7440,
            -65.6193, 167.6340,
            -84.9171, 172.4890,
            -105.6580, 176.1600,
            -127.7290, 178.4990,
            -151.0180, 179.3580,
            -175.3150, 178.6200,
            -200.4120, 176.1710,
            -226.0990, 171.8950,
            -252.1680, 165.6780,
            -278.3360, 157.4680,
            -304.3180, 147.2180,
            -329.8330, 134.8750,
            -354.5970, 120.3920,
            -378.2930, 103.8060,
            -400.6060, 85.1566,
            -421.2190, 64.4827,
            -439.8150, 41.8233,
            -456.0980, 17.3157,
            -469.7720, -8.9026,
            -480.5390, -36.6943,
            -488.1040, -65.9220,
            -492.2470, -96.3570,
            -492.7470, -127.7710,
            -489.3860, -159.9350,
            -481.9450, -192.6210,
            -470.3300, -225.5330,
            -454.4520, -258.3760,
            -434.2190, -290.8560,
            -409.5390, -322.6770,
            -380.4850, -353.5160,
            -347.1300, -383.0520,
            -309.5460, -410.9610,
            -267.8070, -436.9230,
            -222.1620, -460.6360,
            -172.8590, -481.8000,
            -120.1500, -500.1150,
            -64.2822, -515.2800,
            -5.6683, -527.0690,
            55.2807, -535.2540,
            118.1530, -539.6100,
            182.5380, -539.9080,
            247.9050, -536.0420,
            313.7230, -527.9050,
            379.4630, -515.3870,
            444.5920, -498.3830,
            508.5300, -476.9360,
            570.6930, -451.0900,
            630.4980, -420.8890,
            687.3620, -386.3760,
            740.7330, -347.7600,
            790.0580, -305.2480,
            834.7830, -259.0460,
            874.3570, -209.3630,
            908.3420, -156.5580,
            936.3020, -100.9890,
            957.8000, -43.0153,
            972.3990, 17.0034,
            979.8580, 78.5928,
            979.9330, 141.2780,
            972.3820, 204.5850,
            956.9620, 268.0390,
            933.6810, 331.1060,
            902.5470, 393.2530,
            863.5660, 453.9470,
            816.7480, 512.6540,
            762.3730, 568.8550,
            700.7260, 622.0260,
            632.0880, 671.6490,
            556.7420, 717.2010,
            475.2320, 758.2510,
            388.1010, 794.3650,
            295.8950, 825.1110,
            199.1560, 850.0550,
            98.6384, 868.9230,
            -4.9058, 881.4410,
            -110.7230, 887.3330,
            -218.0610, 886.3250,
            -326.0450, 878.3520,
            -433.7990, 863.3510,
            -540.4500, 841.2580,
            -645.1220, 812.0080,
            -746.9320, 775.7760,
            -844.9930, 732.7360,
            -938.4210, 683.0630,
            -1026.3300, 626.9290,
            -1107.9500, 564.7440,
            -1182.5100, 496.9150,
            -1249.2300, 423.8500,
            -1307.3400, 345.9580,
            -1356.3000, 263.8410,
            -1395.5601, 178.1060,
            -1424.5800, 89.3544,
            -1442.8101, -1.8081,
            -1450.0300, -94.6493,
            -1446.0000, -188.4370,
            -1430.5200, -282.4380,
            -1403.3500, -375.9200,
            -1364.6400, -468.1140,
            -1314.5400, -558.2480,
            -1253.2100, -645.5530,
            -1180.7900, -729.2580,
            -1097.8199, -808.6580,
            -1004.8300, -883.0470,
            -902.3400, -951.7190,
            -790.8950, -1013.9700,
            -671.3580, -1069.2600,
            -544.5970, -1117.0400,
            -411.4790, -1156.7800,
            -272.8720, -1187.9301,
            -129.8850, -1210.2000,
            16.3737, -1223.3101,
            164.7960, -1226.9500,
            314.2720, -1220.8400,
            463.5880, -1204.9900,
            611.5260, -1179.4100,
            756.8710, -1144.1200,
            898.4070, -1099.1200,
            1034.9700, -1044.7600,
            1165.3900, -981.3600,
            1288.5000, -909.2660,
            1403.1300, -828.8070,
            1508.3300, -740.6180,
            1603.1400, -645.3280,
            1686.6100, -543.5710,
            1757.7600, -435.9780,
            1816.0000, -323.4100,
            1860.7200, -206.7290,
            1891.3101, -86.7970,
            1907.1600, 35.5243,
            1908.1100, 159.2450,
            1894.0000, 283.3750,
            1864.6801, 406.9230,
            1819.9900, 528.9010,
            1760.2700, 648.3140,
            1685.8500, 764.1680,
            1597.0800, 875.4710,
            1494.3000, 981.2280,
            1378.5699, 1080.5800,
            1250.9800, 1172.6700,
            1112.6000, 1256.6300,
            964.4970, 1331.6000,
            811.5610, 1397.3700,
            658.6710, 1453.7000,
            510.7100, 1500.3500,
            372.5590, 1537.1200,
            249.5990, 1565.0900,
            147.2110, 1585.3800,
            70.7723, 1599.0800,
            25.6649, 1607.3000,
            4.0555, 1611.4100,
            -1.8886, 1612.7800
        ];

    }


}
