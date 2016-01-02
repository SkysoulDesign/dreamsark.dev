var DreamsArk;
(function (DreamsArk) {
    var Helpers;
    (function (Helpers) {
        Helpers.init = function (items) {
            if (items === void 0) { items = []; }
            /**
             * Init All items in a row
             */
            Helpers.each(items, function (item) {
                var component = new item, instance = component.instance;
                if (is.Function(component.configure))
                    component.configure();
                item.instance = instance ? instance : component;
            });
        };
        Helpers.query = function (element) {
            return document.querySelector(element);
        };
        Helpers.each = function (items, callback, context) {
            if (items === void 0) { items = []; }
            if (context === void 0) { context = DreamsArk; }
            if (is.Array(items))
                items.forEach(callback.bind(context));
            if (is.Object(items))
                Object.keys(items).forEach(function (name) {
                    callback.call(context, items[name], name);
                });
        };
        Helpers.For = function (max, callback, context, reverse) {
            if (context === void 0) { context = DreamsArk; }
            if (reverse === void 0) { reverse = false; }
            /**
             * if it's array of object
             */
            if (is.Array(max) || is.Object(max))
                max = Helpers.length(max);
            /**
             * Play for on Reverse
             */
            if (reverse === true) {
                for (var i = max - 1; i >= 0; i--)
                    if (callback.call(context, i))
                        break;
                return;
            }
            for (var i = 0; i < max; i++) {
                if (callback.call(context, i))
                    break;
            }
        };
        Helpers.length = function (item) {
            if (item === void 0) { item = []; }
            if (is.Array(item))
                return item.length;
            if (is.Object(item)) {
                var length = 0;
                Helpers.each(item, function () {
                    length++;
                });
                return length;
            }
        };
        Helpers.contains = function (items, element) {
            if (is.Array(items))
                return items.indexOf(element) > -1;
            if (is.Object(items))
                console.log('is Object Please finish implementing this function');
            return false;
        };
        Helpers.reverse = function (items) {
            return items.sort(function (a, b) {
                return b - a;
            });
        };
        Helpers.filter = function (obj, list) {
            var result = {};
            Helpers.each(obj, function (el, key) {
                if (Helpers.contains(list, key))
                    result[key] = obj[key];
            });
            return result;
        };
        /**
         * Dom Utils
         */
        Helpers.appendTo = function (element, domElement) {
            document.querySelector(element).appendChild(domElement);
        };
        Helpers.removeById = function (collection, id) {
            Helpers.For(collection, function (index) {
                if (collection[index].id === id)
                    collection.splice(index, 1);
            });
        };
        Helpers.timeout = function (time, callback, context) {
            if (context === void 0) { context = DreamsArk; }
            return window.setTimeout(callback.bind(context), time * 1000);
        };
        Helpers.clone = function (obj, skip) {
            if (!is.Object(obj))
                return obj;
            var temp = {};
            Helpers.each(obj, function (el, key) {
                /**
                 * Skip Properties if it has been set
                 */
                if (!is.Null(skip) && Helpers.contains(skip, key))
                    return;
                temp[key] = Helpers.clone(obj[key], skip);
            }, this);
            return temp;
        };
        Helpers.map = function (obj, callback, context) {
            if (context === void 0) { context = DreamsArk; }
            var instance = {};
            /**
             * Loop on every property and set them accordingly
             */
            Helpers.each(obj, function (el, index) {
                /**
                 * if it's an object, map again
                 */
                if (is.Object(el)) {
                    return instance[index] = Helpers.map(el, callback, context);
                }
                else {
                    /**
                     * call Callback
                     */
                    instance[index] = callback.call(context, el, index);
                }
            }, this);
            return instance;
        };
        Helpers.deg2rad = function (degrees) {
            return (degrees * Math.PI / 180);
        };
        /**
         * Checker if obj is X type
         */
        var is = (function () {
            function is() {
            }
            is.Array = function (item) {
                return Array.isArray(item);
            };
            is.Object = function (item) {
                return (typeof item === "object" && !Array.isArray(item) && item !== null);
            };
            is.Null = function (item) {
                return (item === null || item === undefined || item === 0 || item === '0');
            };
            is.Function = function (item) {
                return !!(item && item.constructor && item.call && item.apply);
            };
            is.Image = function (item) {
                var ext = item.split('.').pop();
                return (ext === 'jpg' || ext === 'png');
            };
            is.OBJ = function (item) {
                var ext = item.split('.').pop();
                return (ext === 'obj');
            };
            return is;
        })();
        Helpers.is = is;
        var random = (function () {
            function random() {
            }
            random.between = function (min, max) {
                return Math.floor((Math.random() * ((max + 1) - min)) + min);
            };
            random.id = function (length, radix) {
                if (length === void 0) { length = 27; }
                if (radix === void 0) { radix = 36; }
                return (Math.random() + 1).toString(radix).substring(2, length + 2);
            };
            random.vector3 = function (x, y, z, distance, stick) {
                if (x === void 0) { x = 0; }
                if (y === void 0) { y = 0; }
                if (z === void 0) { z = 0; }
                if (distance === void 0) { distance = 0; }
                if (stick === void 0) { stick = false; }
                // Coordinates
                var u1 = Math.random() * 2 - 1, u2 = Math.random(), radius = Math.sqrt(1 - u1 * u1), theta = 2 * Math.PI * u2;
                // Stick to surface or disperse inside sphere
                if (!stick)
                    distance = Math.random() * distance;
                return new THREE.Vector3(radius * Math.cos(theta) * distance + x, radius * Math.sin(theta) * distance + y, u1 * distance + z);
            };
            return random;
        })();
        Helpers.random = random;
        var where = (function () {
            function where() {
            }
            where.id = function (collection, id) {
                var occurrence = [];
                Helpers.each(collection, function (element) {
                    if (element.id === id)
                        occurrence = element;
                });
                return occurrence;
            };
            where.name = function (collection, id) {
                var occurrences = [];
                Helpers.each(collection, function (element) {
                    if (element.id === id)
                        occurrences.push(element);
                });
                return Helpers.length(occurrences) > 0 ? occurrences[0] : occurrences;
            };
            return where;
        })();
        Helpers.where = where;
        var math = (function () {
            function math() {
                this.calculator = function (origin, obj, operator) {
                    var temp = {}, operators = {
                        '-': function (a, b) {
                            return a - b;
                        },
                        '+': function (a, b) {
                            return a + b;
                        },
                        '*': function (a, b) {
                            return a * b;
                        },
                        '/': function (a, b) {
                            return a / b;
                        }
                    };
                    if (is.Object(origin)) {
                        Helpers.each(origin, function (el, index) {
                            if (is.Object(el)) {
                                return temp[index] = this.calculator(el, is.Object(obj) ? obj[index] : obj, operator);
                            }
                            if (is.Object(obj)) {
                                if (is.Object(obj[index]))
                                    return temp[index] = this.calculator(el, obj[index], operator);
                                return temp[index] = operators[operator](el, obj[index]);
                            }
                            temp[index] = operators[operator](el, obj);
                        }, this);
                        return temp;
                    }
                    return operators[operator](origin, obj);
                };
            }
            math.sub = function (origin, obj) {
                return (new math).calculator(origin, obj, '-');
            };
            math.add = function (origin, obj) {
                return (new math).calculator(origin, obj, '+');
            };
            math.multiply = function (origin, obj) {
                return (new math).calculator(origin, obj, '*');
            };
            math.divide = function (origin, obj) {
                return (new math).calculator(origin, obj, '/');
            };
            return math;
        })();
        Helpers.math = math;
    })(Helpers = DreamsArk.Helpers || (DreamsArk.Helpers = {}));
})(DreamsArk || (DreamsArk = {}));
var DreamsArk;
(function (DreamsArk) {
    var Elements;
    (function (Elements) {
        var deg2rad = DreamsArk.Helpers.deg2rad;
        var Tunnel = (function () {
            function Tunnel() {
            }
            Tunnel.prototype.maps = function () {
                return {
                    wave: 'assets/001_electric.jpg',
                    portal: 'assets/portal-assets/portal.png',
                    beam_1: 'assets/portal-assets/beam_1.png',
                    been_2: 'assets/portal-assets/beam_2.png',
                };
            };
            Tunnel.prototype.create = function (maps, objs, data) {
                var group = new THREE.Group(), browser = DreamsArk.module('Browser'), texture = maps.wave;
                texture.wrapT = texture.wrapS = THREE.RepeatWrapping;
                texture.repeat.set(1, 2);
                var mainTube = new THREE.Mesh(new THREE.CylinderGeometry(50, 50, 1024, 16, 32, true), new THREE.MeshBasicMaterial({
                    color: 0x2222ff,
                    //ambient: data.innerColor,
                    transparent: true,
                    alphaMap: texture,
                    //shininess: 0,
                    side: THREE.BackSide,
                    opacity: 0,
                    blending: THREE.AdditiveBlending,
                }));
                var otterTube = new THREE.Mesh(new THREE.CylinderGeometry(150, 150, 1024, 16, 32, true), new THREE.MeshBasicMaterial({
                    color: 0x2222ff,
                    //ambient: data.innerColor,
                    transparent: true,
                    alphaMap: texture,
                    blending: THREE.AdditiveBlending,
                    //shininess: 0,
                    side: THREE.BackSide
                }));
                var beam_1_Geometry = new THREE.PlaneGeometry(browser.innerWidth / 50, browser.innerHeight / 50, 1);
                var beam_1_Material = new THREE.MeshBasicMaterial({
                    map: maps.beam_1,
                    transparent: true,
                    alphaTest: 0.5,
                    blending: THREE.AdditiveBlending
                });
                var beam_1 = new THREE.Mesh(beam_1_Geometry, beam_1_Material);
                beam_1.rotation.x = deg2rad(-90);
                var portal_Geometry = new THREE.PlaneGeometry(browser.innerWidth * 2, browser.innerHeight * 2, 1);
                var portal_Material = new THREE.MeshBasicMaterial({
                    map: maps.portal,
                    transparent: true,
                    alphaTest: 1,
                    blending: THREE.AdditiveBlending
                });
                var portal = new THREE.Mesh(portal_Geometry, portal_Material);
                portal.rotation.x = deg2rad(-90);
                portal.position.y = -800;
                group.add(mainTube);
                group.add(beam_1);
                group.add(portal);
                return mainTube;
            };
            return Tunnel;
        })();
        Elements.Tunnel = Tunnel;
    })(Elements = DreamsArk.Elements || (DreamsArk.Elements = {}));
})(DreamsArk || (DreamsArk = {}));
var DreamsArk;
(function (DreamsArk) {
    var Elements;
    (function (Elements) {
        var Skybox = (function () {
            function Skybox() {
            }
            Skybox.prototype.maps = function () {
                return {
                    skybox: 'lib/background-sphere.jpg'
                };
            };
            Skybox.prototype.create = function (maps, objs, data) {
                var geometry = new THREE.SphereGeometry(50000, 50, 50);
                geometry.scale(-1, 1, 1);
                var material = new THREE.MeshBasicMaterial({ map: maps.skybox, transparent: true, opacity: 0 });
                return new THREE.Mesh(geometry, material);
            };
            return Skybox;
        })();
        Elements.Skybox = Skybox;
    })(Elements = DreamsArk.Elements || (DreamsArk.Elements = {}));
})(DreamsArk || (DreamsArk = {}));
var DreamsArk;
(function (DreamsArk) {
    var Elements;
    (function (Elements) {
        var For = DreamsArk.Helpers.For;
        var random = DreamsArk.Helpers.random;
        var Plexus = (function () {
            function Plexus() {
            }
            Plexus.prototype.data = function () {
                return {
                    nodeStick: false,
                    coreStick: false,
                    coreRadius: 300,
                    coreDistance: 15,
                    maxConnections: 2,
                    connectionsMinDistance: 30,
                    nodeRadius: 30,
                    core: 50,
                    nodes: 20,
                    nodeDistance: 15,
                    nodeRandom: true,
                    nodesBag: [],
                    coreBag: [],
                    hexicles: 500,
                    hexiclesRadius: 500,
                    hexcleStick: false,
                    hexBag: [],
                    hex: null,
                };
            };
            Plexus.prototype.maps = function () {
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
                };
            };
            Plexus.prototype.create = function (maps, objs, data) {
                var group = new THREE.Group(), hexicles = new THREE.BufferGeometry(), hexiclePositions = new Float32Array(data.hexicles * 3), hexicleMaterial = new THREE.PointsMaterial({
                    map: maps.hexicle,
                    size: 2,
                    transparent: true,
                    alphaTest: 0.1,
                    sizeAttenuation: true,
                    opacity: 0.2
                }), cores = new THREE.BufferGeometry(), corePositions = new Float32Array(data.core * 3), coreMaterial = new THREE.PointsMaterial({
                    map: maps.core,
                    size: 5,
                    transparent: true,
                    alphaTest: 0.5,
                    sizeAttenuation: true,
                }), coreLines = new THREE.BufferGeometry(), coreLinePositions = new Float32Array((data.core * data.core * data.core) * 3 - data.core), coreLineMaterial = new THREE.LineBasicMaterial({
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
                    });
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
                    var nodeLines = new THREE.BufferGeometry(), nodeLinePositions = new Float32Array((data.nodes * 2) * 3), nodeLineMaterial = new THREE.LineDashedMaterial({
                        color: 0xffffff,
                        transparent: true,
                        dashSize: 1,
                        gapSize: 0.2,
                        opacity: 0.5
                    }), index = 0;
                    For(data.nodeRandom ? random.between(1, data.nodes) : data.nodes, function (j) {
                        var nodes = new THREE.BufferGeometry(), nodePositions = new Float32Array(3), nodeMaterial = new THREE.PointsMaterial({
                            size: 5,
                            //map: maps['point_' + (i + 1) + '_' + (j + 1)],
                            map: maps['point_' + random.between(1, 2) + '_' + random.between(1, 5)],
                            //map: maps.point_squad,
                            transparent: true,
                            alphaTest: 0.5,
                            sizeAttenuation: true,
                        });
                        nodes.addAttribute('position', new THREE.BufferAttribute(nodePositions, 3).setDynamic(true));
                        var node = new THREE.Points(nodes, nodeMaterial), vector = random.vector3(0, 0, 0, data.nodeRadius, data.nodeStick);
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
                        node.position.set(corePositions[i * 3] + vector.x, corePositions[i * 3 + 1] + vector.y, corePositions[i * 3 + 2] + vector.z);
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
                var hexicle = data.hex = new THREE.Points(hexicles, hexicleMaterial), core = new THREE.Points(cores, coreMaterial), coreLine = new THREE.LineSegments(coreLines, coreLineMaterial);
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
            };
            return Plexus;
        })();
        Elements.Plexus = Plexus;
    })(Elements = DreamsArk.Elements || (DreamsArk.Elements = {}));
})(DreamsArk || (DreamsArk = {}));
var DreamsArk;
(function (DreamsArk) {
    var Elements;
    (function (Elements) {
        var For = DreamsArk.Helpers.For;
        var random = DreamsArk.Helpers.random;
        var Particles = (function () {
            function Particles() {
            }
            Particles.prototype.maps = function () {
                return { particle: 'lib/spark.png', particleFront: 'lib/particle-front.png' };
            };
            Particles.prototype.data = function () {
                return {
                    velocity: [],
                    start: false,
                    particleFrontMaterial: null
                };
            };
            Particles.prototype.create = function (maps, objs, data) {
                var maxParticleCount = 1000, radius = 50;
                var PointMaterial = new THREE.PointsMaterial({
                    //color: 0x000000,
                    size: 2,
                    blending: THREE.AdditiveBlending,
                    map: maps.particle,
                    transparent: true,
                    alphaTest: 0.01,
                    sizeAttenuation: true,
                    opacity: 0
                });
                /**
                 * Save a Second version along
                 * @type {PointsMaterial}
                 */
                data.particleFrontMaterial = new THREE.PointsMaterial({
                    size: 1.5,
                    blending: THREE.AdditiveBlending,
                    map: maps.particleFront,
                    transparent: true,
                    alphaTest: 0.01,
                    sizeAttenuation: true,
                    opacity: 0.3
                });
                var particles = new THREE.BufferGeometry();
                var particlePositions = new Float32Array(maxParticleCount * 3);
                /**
                 * Add Vertices to Points
                 */
                For(maxParticleCount, function (i) {
                    var vector = random.vector3(0, 0, 0, radius, true);
                    particlePositions[i * 3] = vector.x;
                    particlePositions[i * 3 + 1] = vector.y;
                    particlePositions[i * 3 + 2] = vector.z;
                    data.velocity.push(new THREE.Vector3(10 * Math.random(), 10 * Math.random(), 10 * Math.random()));
                });
                particles.addAttribute('position', new THREE.BufferAttribute(particlePositions, 3).setDynamic(true));
                return new THREE.Points(particles, PointMaterial);
            };
            return Particles;
        })();
        Elements.Particles = Particles;
    })(Elements = DreamsArk.Elements || (DreamsArk.Elements = {}));
})(DreamsArk || (DreamsArk = {}));
var DreamsArk;
(function (DreamsArk) {
    var Elements;
    (function (Elements) {
        var Background = (function () {
            function Background() {
            }
            Background.prototype.maps = function () {
                return {
                    overlay: 'assets/planet-assets/bg.jpg',
                };
            };
            Background.prototype.create = function (maps, objs) {
                var power = 15;
                var geometry = new THREE.PlaneGeometry(2048 / power, 1024 / power, 1);
                var material = new THREE.MeshBasicMaterial({
                    map: maps.overlay,
                    transparent: true,
                    blending: THREE.CustomBlending,
                });
                return new THREE.Mesh(geometry, material);
            };
            return Background;
        })();
        Elements.Background = Background;
    })(Elements = DreamsArk.Elements || (DreamsArk.Elements = {}));
})(DreamsArk || (DreamsArk = {}));
var DreamsArk;
(function (DreamsArk) {
    var Elements;
    (function (Elements) {
        var Logo = (function () {
            function Logo() {
            }
            Logo.prototype.maps = function () {
                return {
                    logo: 'assets/new-assets/logo-tex.png',
                };
            };
            Logo.prototype.objs = function () {
                return {
                    logo: 'models/logo.obj',
                };
            };
            Logo.prototype.data = function () {
                return { mouse: { speed: new THREE.Vector3(0.02, 0.02, 0.02), enabled: false, inverse: false } };
            };
            Logo.prototype.create = function (maps, objs, data) {
                var logo = objs.logo, texture = maps.logo;
                texture.wrapS = THREE.MirroredRepeatWrapping;
                texture.wrapT = THREE.MirroredRepeatWrapping;
                texture.mapping = THREE.CubeRefractionMapping;
                logo.rotation.x = Math.PI * 2;
                logo.material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
                return logo;
            };
            return Logo;
        })();
        Elements.Logo = Logo;
    })(Elements = DreamsArk.Elements || (DreamsArk.Elements = {}));
})(DreamsArk || (DreamsArk = {}));
var DreamsArk;
(function (DreamsArk) {
    var Elements;
    (function (Elements) {
        var Ren = (function () {
            function Ren() {
            }
            Ren.prototype.maps = function () {
                return {
                    logo: 'assets/new-assets/ren-tex.jpg'
                };
            };
            Ren.prototype.objs = function () {
                return {
                    logo: 'models/ren.obj',
                };
            };
            Ren.prototype.create = function (maps, objs, data) {
                var logo = objs.logo, texture = maps.logo;
                logo.rotation.x = Math.PI * 2;
                logo.material = new THREE.MeshBasicMaterial({ map: texture });
                return logo;
            };
            return Ren;
        })();
        Elements.Ren = Ren;
    })(Elements = DreamsArk.Elements || (DreamsArk.Elements = {}));
})(DreamsArk || (DreamsArk = {}));
var DreamsArk;
(function (DreamsArk) {
    var Elements;
    (function (Elements) {
        var Asteroid = (function () {
            function Asteroid() {
            }
            Asteroid.prototype.maps = function () {
                return {
                    rocks: 'assets/transition-assets/rocks.png'
                };
            };
            Asteroid.prototype.create = function (maps, objs, data) {
                var geometry = new THREE.PlaneGeometry(1024 / 20, 1024 / 20, 1);
                var material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: maps.rocks, transparent: true });
                return new THREE.Mesh(geometry, material);
            };
            return Asteroid;
        })();
        Elements.Asteroid = Asteroid;
    })(Elements = DreamsArk.Elements || (DreamsArk.Elements = {}));
})(DreamsArk || (DreamsArk = {}));
var DreamsArk;
(function (DreamsArk) {
    var Elements;
    (function (Elements) {
        var Galaxy = (function () {
            function Galaxy() {
            }
            Galaxy.prototype.maps = function () {
                return {
                    galaxy: 'lib/galaxy.png',
                };
            };
            Galaxy.prototype.create = function (maps, objs) {
                var geometry = new THREE.PlaneGeometry(50, 50, 1);
                var material = new THREE.MeshBasicMaterial({
                    color: 0xffff00,
                    map: maps.galaxy,
                    transparent: true,
                });
                return new THREE.Mesh(geometry, material);
            };
            return Galaxy;
        })();
        Elements.Galaxy = Galaxy;
    })(Elements = DreamsArk.Elements || (DreamsArk.Elements = {}));
})(DreamsArk || (DreamsArk = {}));
var DreamsArk;
(function (DreamsArk) {
    var Elements;
    (function (Elements) {
        var Overlay1 = (function () {
            function Overlay1() {
            }
            Overlay1.prototype.maps = function () {
                return {
                    galaxy: 'assets/universe-assets/overlay-1.png',
                };
            };
            Overlay1.prototype.create = function (maps, objs) {
                var geometry = new THREE.PlaneGeometry(50, 50, 1);
                var material = new THREE.MeshBasicMaterial({
                    map: maps.galaxy,
                    transparent: true
                });
                return new THREE.Mesh(geometry, material);
            };
            return Overlay1;
        })();
        Elements.Overlay1 = Overlay1;
    })(Elements = DreamsArk.Elements || (DreamsArk.Elements = {}));
})(DreamsArk || (DreamsArk = {}));
var DreamsArk;
(function (DreamsArk) {
    var Elements;
    (function (Elements) {
        var Overlay2 = (function () {
            function Overlay2() {
            }
            Overlay2.prototype.maps = function () {
                return {
                    overlay: 'assets/universe-assets/overlay-2.png',
                };
            };
            Overlay2.prototype.create = function (maps, objs) {
                var geometry = new THREE.PlaneGeometry(50, 50, 1);
                var material = new THREE.MeshBasicMaterial({
                    map: maps.overlay,
                    transparent: true,
                    blending: THREE.CustomBlending,
                });
                return new THREE.Mesh(geometry, material);
            };
            return Overlay2;
        })();
        Elements.Overlay2 = Overlay2;
    })(Elements = DreamsArk.Elements || (DreamsArk.Elements = {}));
})(DreamsArk || (DreamsArk = {}));
var DreamsArk;
(function (DreamsArk) {
    var Elements;
    (function (Elements) {
        var Cube = (function () {
            function Cube() {
            }
            Cube.prototype.maps = function () {
                return {
                    sparks1: 'lib/cover-hunger.png'
                };
            };
            Cube.prototype.objs = function () {
                return {
                    logo1: 'models/logo.obj',
                };
            };
            Cube.prototype.create = function (maps, objs, data) {
                var geometry = new THREE.BoxGeometry(1, 1, 1);
                var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
                return new THREE.Mesh(geometry, material);
            };
            return Cube;
        })();
        Elements.Cube = Cube;
    })(Elements = DreamsArk.Elements || (DreamsArk.Elements = {}));
})(DreamsArk || (DreamsArk = {}));
var DreamsArk;
(function (DreamsArk) {
    var Modules;
    (function (Modules) {
        var Browser = (function () {
            function Browser() {
                this.instance = this;
                this.innerWidth = window.innerWidth;
                this.innerHeight = window.innerHeight;
                this.devicePixelRatio = window.devicePixelRatio;
            }
            Browser.prototype.configure = function () {
            };
            return Browser;
        })();
        Modules.Browser = Browser;
    })(Modules = DreamsArk.Modules || (DreamsArk.Modules = {}));
})(DreamsArk || (DreamsArk = {}));
var DreamsArk;
(function (DreamsArk) {
    var Modules;
    (function (Modules) {
        var length = DreamsArk.Helpers.length;
        var each = DreamsArk.Helpers.each;
        var reverse = DreamsArk.Helpers.reverse;
        var Checker = (function () {
            function Checker() {
                this.collection = [];
            }
            Checker.prototype.add = function (callback, context) {
                if (context === void 0) { context = DreamsArk; }
                this.collection.push({ callback: callback.bind(context), time: +new Date() });
            };
            Checker.prototype.update = function () {
                if (length(this.collection) > 0) {
                    var removeBag = [];
                    each(this.collection, function (el, index) {
                        if (el.callback((+new Date()) - el.time, el.time))
                            removeBag.push(index);
                    });
                    if (length(this.collection) > 0)
                        this.remove(removeBag);
                }
            };
            Checker.prototype.remove = function (items) {
                each(reverse(items), function (item) {
                    this.collection.splice(item, 1);
                }, this);
            };
            return Checker;
        })();
        Modules.Checker = Checker;
    })(Modules = DreamsArk.Modules || (DreamsArk.Modules = {}));
})(DreamsArk || (DreamsArk = {}));
var DreamsArk;
(function (DreamsArk) {
    var Modules;
    (function (Modules) {
        var map = DreamsArk.Helpers.map;
        var is = DreamsArk.Helpers.is;
        var math = DreamsArk.Helpers.math;
        var timeout = DreamsArk.Helpers.timeout;
        var clone = DreamsArk.Helpers.clone;
        var Animator = (function () {
            function Animator() {
            }
            Animator.prototype.init = function (name, parameters, context) {
                var tween = new Tween(name, parameters, context);
                if (parameters.autoStart === false)
                    return tween;
                tween.init();
            };
            ;
            Animator.prototype.backIn = function (parameters, context) {
                return this.init('backIn', parameters, context);
            };
            ;
            Animator.prototype.backOut = function (parameters, context) {
                return this.init('backOut', parameters, context);
            };
            ;
            Animator.prototype.backInOut = function (parameters, context) {
                return this.init('backInOut', parameters, context);
            };
            ;
            Animator.prototype.bounceOut = function (parameters, context) {
                return this.init('bounceOut', parameters, context);
            };
            ;
            Animator.prototype.bounceIn = function (parameters, context) {
                return this.init('bounceIn', parameters, context);
            };
            ;
            Animator.prototype.bounceInOut = function (parameters, context) {
                return this.init('bounceInOut', parameters, context);
            };
            ;
            Animator.prototype.circIn = function (parameters, context) {
                return this.init('circIn', parameters, context);
            };
            ;
            Animator.prototype.circOut = function (parameters, context) {
                return this.init('circOut', parameters, context);
            };
            ;
            Animator.prototype.circInOut = function (parameters, context) {
                return this.init('circInOut', parameters, context);
            };
            ;
            Animator.prototype.cubicIn = function (parameters, context) {
                return this.init('cubicIn', parameters, context);
            };
            ;
            Animator.prototype.cubicOut = function (parameters, context) {
                return this.init('cubicOut', parameters, context);
            };
            ;
            Animator.prototype.cubicInOut = function (parameters, context) {
                return this.init('cubicInOut', parameters, context);
            };
            ;
            Animator.prototype.elasticIn = function (parameters, context) {
                return this.init('elasticIn', parameters, context);
            };
            ;
            Animator.prototype.elasticOut = function (parameters, context) {
                return this.init('elasticOut', parameters, context);
            };
            ;
            Animator.prototype.elasticInOut = function (parameters, context) {
                return this.init('elasticInOut', parameters, context);
            };
            ;
            Animator.prototype.expoIn = function (parameters, context) {
                return this.init('expoIn', parameters, context);
            };
            ;
            Animator.prototype.expoOut = function (parameters, context) {
                return this.init('expoOut', parameters, context);
            };
            ;
            Animator.prototype.expoInOut = function (parameters, context) {
                return this.init('expoInOut', parameters, context);
            };
            ;
            Animator.prototype.linearIn = function (parameters, context) {
                return this.init('linearIn', parameters, context);
            };
            ;
            Animator.prototype.linearOut = function (parameters, context) {
                return this.init('linearOut', parameters, context);
            };
            ;
            Animator.prototype.linearInOut = function (parameters, context) {
                return this.init('linearInOut', parameters, context);
            };
            ;
            Animator.prototype.quadIn = function (parameters, context) {
                return this.init('quadIn', parameters, context);
            };
            ;
            Animator.prototype.quadOut = function (parameters, context) {
                return this.init('quadOut', parameters, context);
            };
            ;
            Animator.prototype.quadInOut = function (parameters, context) {
                return this.init('quadInOut', parameters, context);
            };
            ;
            Animator.prototype.quartIn = function (parameters, context) {
                return this.init('quartIn', parameters, context);
            };
            ;
            Animator.prototype.quartOut = function (parameters, context) {
                return this.init('quartOut', parameters, context);
            };
            ;
            Animator.prototype.quartInOut = function (parameters, context) {
                return this.init('quartInOut', parameters, context);
            };
            ;
            Animator.prototype.quintIn = function (parameters, context) {
                return this.init('quintIn', parameters, context);
            };
            ;
            Animator.prototype.quintOut = function (parameters, context) {
                return this.init('quintOut', parameters, context);
            };
            ;
            Animator.prototype.quintInOut = function (parameters, context) {
                return this.init('quintInOut', parameters, context);
            };
            ;
            Animator.prototype.sineIn = function (parameters, context) {
                return this.init('sineIn', parameters, context);
            };
            ;
            Animator.prototype.sineOut = function (parameters, context) {
                return this.init('sineOut', parameters, context);
            };
            ;
            Animator.prototype.sineInOut = function (parameters, context) {
                return this.init('sineInOut', parameters, context);
            };
            ;
            return Animator;
        })();
        Modules.Animator = Animator;
        var Tween = (function () {
            function Tween(equation, parameters, context) {
                if (context === void 0) { context = DreamsArk; }
                this.equation = equation;
                this.context = context;
                this.bounceInOut = function (time, begin, change, duration) {
                    if (time < duration / 2) {
                        return this.bounceIn(time * 2, 0, change, duration) * 0.5 + begin;
                    }
                    else {
                        return this.bounceOut(time * 2 - duration, 0, change, duration) * 0.5 + change * 0.5 + begin;
                    }
                };
                this.circIn = function (time, begin, change, duration) {
                    return -change * (Math.sqrt(1 - (time = time / duration) * time) - 1) + begin;
                };
                this.circOut = function (time, begin, change, duration) {
                    return change * Math.sqrt(1 - (time = time / duration - 1) * time) + begin;
                };
                this.circInOut = function (time, begin, change, duration) {
                    if ((time = time / (duration / 2)) < 1) {
                        return -change / 2 * (Math.sqrt(1 - time * time) - 1) + begin;
                    }
                    else {
                        return change / 2 * (Math.sqrt(1 - (time -= 2) * time) + 1) + begin;
                    }
                };
                this.cubicIn = function (time, begin, change, duration) {
                    return change * (time /= duration) * time * time + begin;
                };
                this.cubicOut = function (time, begin, change, duration) {
                    return change * ((time = time / duration - 1) * time * time + 1) + begin;
                };
                this.cubicInOut = function (time, begin, change, duration) {
                    if ((time = time / (duration / 2)) < 1) {
                        return change / 2 * time * time * time + begin;
                    }
                    else {
                        return change / 2 * ((time -= 2) * time * time + 2) + begin;
                    }
                };
                this.elasticOut = function (time, begin, change, duration, amplitude, period) {
                    var overshoot;
                    if (amplitude == null) {
                        amplitude = null;
                    }
                    if (period == null) {
                        period = null;
                    }
                    if (time === 0) {
                        return begin;
                    }
                    else if ((time = time / duration) === 1) {
                        return begin + change;
                    }
                    else {
                        if (!(period != null)) {
                            period = duration * 0.3;
                        }
                        if (!(amplitude != null) || amplitude < Math.abs(change)) {
                            amplitude = change;
                            overshoot = period / 4;
                        }
                        else {
                            overshoot = period / (2 * Math.PI) * Math.asin(change / amplitude);
                        }
                        return (amplitude * Math.pow(2, -10 * time)) * Math.sin((time * duration - overshoot) * (2 * Math.PI) / period) + change + begin;
                    }
                };
                this.elasticIn = function (time, begin, change, duration, amplitude, period) {
                    var overshoot;
                    if (amplitude == null) {
                        amplitude = null;
                    }
                    if (period == null) {
                        period = null;
                    }
                    if (time === 0) {
                        return begin;
                    }
                    else if ((time = time / duration) === 1) {
                        return begin + change;
                    }
                    else {
                        if (!(period != null)) {
                            period = duration * 0.3;
                        }
                        if (!(amplitude != null) || amplitude < Math.abs(change)) {
                            amplitude = change;
                            overshoot = period / 4;
                        }
                        else {
                            overshoot = period / (2 * Math.PI) * Math.asin(change / amplitude);
                        }
                        time -= 1;
                        return -(amplitude * Math.pow(2, 10 * time)) * Math.sin((time * duration - overshoot) * (2 * Math.PI) / period) + begin;
                    }
                };
                this.elasticInOut = function (time, begin, change, duration, amplitude, period) {
                    var overshoot;
                    if (amplitude == null) {
                        amplitude = null;
                    }
                    if (period == null) {
                        period = null;
                    }
                    if (time === 0) {
                        return begin;
                    }
                    else if ((time = time / (duration / 2)) === 2) {
                        return begin + change;
                    }
                    else {
                        if (!(period != null)) {
                            period = duration * (0.3 * 1.5);
                        }
                        if (!(amplitude != null) || amplitude < Math.abs(change)) {
                            amplitude = change;
                            overshoot = period / 4;
                        }
                        else {
                            overshoot = period / (2 * Math.PI) * Math.asin(change / amplitude);
                        }
                        if (time < 1) {
                            return -0.5 * (amplitude * Math.pow(2, 10 * (time -= 1))) * Math.sin((time * duration - overshoot) * ((2 * Math.PI) / period)) + begin;
                        }
                        else {
                            return amplitude * Math.pow(2, -10 * (time -= 1)) * Math.sin((time * duration - overshoot) * (2 * Math.PI) / period) + change + begin;
                        }
                    }
                };
                this.expoIn = function (time, begin, change, duration) {
                    if (time === 0) {
                        return begin;
                    }
                    return change * Math.pow(2, 10 * (time / duration - 1)) + begin;
                };
                this.expoOut = function (time, begin, change, duration) {
                    if (time === duration) {
                        return begin + change;
                    }
                    return change * (-Math.pow(2, -10 * time / duration) + 1) + begin;
                };
                this.expoInOut = function (time, begin, change, duration) {
                    if (time === 0) {
                        return begin;
                    }
                    else if (time === duration) {
                        return begin + change;
                    }
                    else if ((time = time / (duration / 2)) < 1) {
                        return change / 2 * Math.pow(2, 10 * (time - 1)) + begin;
                    }
                    else {
                        return change / 2 * (-Math.pow(2, -10 * (time - 1)) + 2) + begin;
                    }
                };
                this.linearIn = function (time, begin, change, duration) {
                    return this.linearNone(time, begin, change, duration);
                }.bind(this);
                this.linearOut = function (time, begin, change, duration) {
                    return this.linearNone(time, begin, change, duration);
                }.bind(this);
                this.linearInOut = function (time, begin, change, duration) {
                    return this.linearNone(time, begin, change, duration);
                }.bind(this);
                this.quadIn = function (time, begin, change, duration) {
                    return change * (time = time / duration) * time + begin;
                };
                this.quadOut = function (time, begin, change, duration) {
                    return -change * (time = time / duration) * (time - 2) + begin;
                };
                this.quadInOut = function (time, begin, change, duration) {
                    if ((time = time / (duration / 2)) < 1) {
                        return change / 2 * time * time + begin;
                    }
                    else {
                        return -change / 2 * ((time -= 1) * (time - 2) - 1) + begin;
                    }
                };
                this.quartIn = function (time, begin, change, duration) {
                    return change * (time = time / duration) * time * time * time + begin;
                };
                this.quartOut = function (time, begin, change, duration) {
                    return -change * ((time = time / duration - 1) * time * time * time - 1) + begin;
                };
                this.quartInOut = function (time, begin, change, duration) {
                    if ((time = time / (duration / 2)) < 1) {
                        return change / 2 * time * time * time * time + begin;
                    }
                    else {
                        return -change / 2 * ((time -= 2) * time * time * time - 2) + begin;
                    }
                };
                this.quintIn = function (time, begin, change, duration) {
                    return change * (time = time / duration) * time * time * time * time + begin;
                };
                this.quintOut = function (time, begin, change, duration) {
                    return change * ((time = time / duration - 1) * time * time * time * time + 1) + begin;
                };
                this.quintInOut = function (time, begin, change, duration) {
                    if ((time = time / (duration / 2)) < 1) {
                        return change / 2 * time * time * time * time * time + begin;
                    }
                    else {
                        return change / 2 * ((time -= 2) * time * time * time * time + 2) + begin;
                    }
                };
                this.sineIn = function (time, begin, change, duration) {
                    return -change * Math.cos(time / duration * (Math.PI / 2)) + change + begin;
                };
                this.sineOut = function (time, begin, change, duration) {
                    return change * Math.sin(time / duration * (Math.PI / 2)) + begin;
                };
                this.sineInOut = function (time, begin, change, duration) {
                    return -change / 2 * (Math.cos(Math.PI * time / duration) - 1) + begin;
                };
                this.duration = parameters.duration * 1000;
                this.destination = parameters.destination;
                this.origin = parameters.origin;
                this.update = parameters.update;
                this.complete = parameters.complete;
                this.start = parameters.start;
                this.delay = parameters.delay;
                this.overshoot = parameters.overshoot;
            }
            Tween.prototype.init = function () {
                /**
                 * if Delay is set, delay this function execution
                 */
                if (this.delay !== false) {
                    timeout(this.delay, function () {
                        /**
                         * Set delay to false so it wont fall here again
                         * @type {boolean}
                         */
                        this.delay = false;
                        this.init();
                    }, this);
                    return;
                }
                var checker = DreamsArk.module('Checker'), instance = {}, equation = this[this.equation], overshoot = this.overshoot, duration = this.duration, onPlayed = false, on = function (currentProgress) {
                    if (onPlayed)
                        return function () {
                        };
                    return function (progress, callback) {
                        if (currentProgress >= progress / 1000) {
                            if (callback instanceof Tween)
                                callback.init();
                            else
                                callback();
                            onPlayed = true;
                        }
                    };
                }, origin = !is.Null(this.origin) ? clone(is.Function(this.origin) ? this.origin() : this.origin) : null, destination = is.Null(this.origin) ? clone(is.Function(this.destination) ? this.destination() : this.destination) : {};
                /**
                 * if Origin is set, subtract it from origin to re-add in the end
                 */
                if (!is.Null(origin))
                    destination = math.sub(this.destination, origin);
                if (is.Function(this.start))
                    this.start();
                checker.add(function (elapsed_time) {
                    if (elapsed_time <= duration) {
                        var progress = elapsed_time / duration;
                        instance = map(destination, function (value) {
                            return equation(progress, 0, value, 1, overshoot);
                        });
                        if (!is.Null(origin))
                            instance = math.add(instance, origin);
                        /**
                         * Call the CallBack
    
                         */
                        this.update.call(this.context, instance, progress, on(progress));
                        return false;
                    }
                    /**
                     * Call on the last frame to make sure the end result is 100% and not a fraction
                     * on 1 = 100%
                     */
                    this.update.call(this.context, this.destination, progress, on(1));
                    if (is.Function(this.complete))
                        this.complete();
                    /**
                     * Destroy Checker
                     */
                    return true;
                }, this);
            };
            Tween.prototype.backIn = function (time, begin, change, duration, overshoot) {
                if (overshoot == null) {
                    overshoot = 1.70158;
                }
                return change * (time /= duration) * time * ((overshoot + 1) * time - overshoot) + begin;
            };
            ;
            Tween.prototype.backOut = function (time, begin, change, duration, overshoot) {
                if (overshoot == null) {
                    overshoot = 1.70158;
                }
                return change * ((time = time / duration - 1) * time * ((overshoot + 1) * time + overshoot) + 1) + begin;
            };
            ;
            Tween.prototype.backInOut = function (time, begin, change, duration, overshoot) {
                if (overshoot == null) {
                    overshoot = 1.70158;
                }
                if ((time = time / (duration / 2)) < 1) {
                    return change / 2 * (time * time * (((overshoot *= 1.525) + 1) * time - overshoot)) + begin;
                }
                else {
                    return change / 2 * ((time -= 2) * time * (((overshoot *= 1.525) + 1) * time + overshoot) + 2) + begin;
                }
            };
            ;
            Tween.prototype.bounceOut = function (time, begin, change, duration) {
                if ((time /= duration) < 1 / 2.75) {
                    return change * (7.5625 * time * time) + begin;
                }
                else if (time < 2 / 2.75) {
                    return change * (7.5625 * (time -= 1.5 / 2.75) * time + 0.75) + begin;
                }
                else if (time < 2.5 / 2.75) {
                    return change * (7.5625 * (time -= 2.25 / 2.75) * time + 0.9375) + begin;
                }
                else {
                    return change * (7.5625 * (time -= 2.625 / 2.75) * time + 0.984375) + begin;
                }
            };
            ;
            Tween.prototype.bounceIn = function (time, begin, change, duration) {
                return change - this.bounceOut(duration - time, 0, change, duration) + begin;
            };
            ;
            Tween.prototype.linearNone = function (time, begin, change, duration) {
                return change * time / duration + begin;
            };
            ;
            return Tween;
        })();
        Modules.Tween = Tween;
    })(Modules = DreamsArk.Modules || (DreamsArk.Modules = {}));
})(DreamsArk || (DreamsArk = {}));
var DreamsArk;
(function (DreamsArk) {
    var Modules;
    (function (Modules) {
        var each = DreamsArk.Helpers.each;
        var is = DreamsArk.Helpers.is;
        var filter = DreamsArk.Helpers.filter;
        var Manager = (function () {
            function Manager() {
                this.on = {
                    start: null,
                    progress: null,
                    load: null,
                    error: null
                };
                this.instance = new THREE.LoadingManager();
            }
            Manager.prototype.configure = function () {
                var on = this.on;
                this.instance.onStart = function (item, loaded, total) {
                    if (is.Function(on.start))
                        on.start(item, loaded, total);
                };
                this.instance.onProgress = function (item, loaded, total) {
                    var loader = DreamsArk.module('Loader');
                    var progress = loader.progress = (loaded * 100) / total;
                    if (is.Function(on.progress))
                        on.progress(Math.round(progress), item, loaded, total);
                };
                this.instance.onLoad = function () {
                    var loader = DreamsArk.module('Loader');
                    loader.complete = true;
                    if (is.Function(on.load))
                        on.load();
                };
                this.instance.onError = function (item) {
                    var loader = DreamsArk.module('Loader');
                    console.log('item: ' + item + " not loaded");
                    loader.failed = true;
                    if (is.Function(on.error))
                        on.error(item);
                };
            };
            return Manager;
        })();
        Modules.Manager = Manager;
        var Loader = (function () {
            function Loader() {
                this.progress = 0;
                this.complete = false;
                this.failed = false;
                this.count = 0;
                var manager = DreamsArk.module('Manager');
                /**
                 * Init Loader
                 * @type {THREE.TextureLoader}
                 */
                this.textureLoader = new THREE.TextureLoader(manager);
                /**
                 * Init OBJ Loader
                 */
                this.objLoader = new THREE.OBJLoader(manager);
            }
            Loader.prototype.configure = function () {
            };
            Loader.prototype.start = function (elements, callback) {
                if (elements === void 0) { elements = DreamsArk.Elements; }
                var maps = {}, objs = {};
                var ready = function (elementName, name, el) {
                    if (el instanceof THREE.Texture) {
                        /**
                         * Set Element Name
                         */
                        maps[elementName] = maps[elementName] || {};
                        maps[elementName][name] = el;
                    }
                    if (el instanceof THREE.Object3D) {
                        /**
                         * fix for getting the object directly, not a Object3D
                         */
                        objs[elementName] = objs[elementName] || {};
                        objs[elementName][name] = el.children[0];
                        objs[elementName][name].name = name;
                    }
                    /**
                     * Check if everything has finished
                     */
                    if (this.count-- === 1) {
                        each(elements, function (el, name) {
                            var instance = new el(), userData = is.Function(instance.data) ? instance.data() : {}, temp = {};
                            temp[name] = instance.create(maps[name], objs[name], userData);
                            temp[name].name = name;
                            temp[name].userData = userData;
                            /**
                             * Override Global Elements Bag
                             */
                            DreamsArk.elementsBag[name] = temp[name];
                        });
                        this.complete = true;
                        callback(DreamsArk.elementsBag);
                    }
                };
                each(elements, function (el, name) {
                    var element = new el;
                    if (is.Function(element.maps))
                        this.load(element.maps(), ready.bind(this, name));
                    if (is.Function(element.objs))
                        this.load(element.objs(), ready.bind(this, name));
                    /**
                     * if there is none then just create it strait away
                     */
                    if (!is.Function(element.maps) && !is.Function(element.objs)) {
                        this.count++;
                        this.complete = false;
                        ready.call(this, name, name, element);
                    }
                }, this);
            };
            Loader.prototype.load = function (items, callback) {
                each(items, function (path, name) {
                    /**
                     * Increase the number of element being loaded
                     */
                    this.count++;
                    this.complete = false;
                    if (is.Image(path))
                        this.textureLoader.load(path, callback.bind(this, name));
                    if (is.OBJ(path))
                        this.objLoader.load(path, callback.bind(this, name));
                }, this);
            };
            Loader.prototype.Load = function (items, callback, elements) {
                if (elements === void 0) { elements = DreamsArk.Elements; }
                this.start(filter(elements, items), callback);
            };
            return Loader;
        })();
        Modules.Loader = Loader;
    })(Modules = DreamsArk.Modules || (DreamsArk.Modules = {}));
})(DreamsArk || (DreamsArk = {}));
var DreamsArk;
(function (DreamsArk) {
    var Modules;
    (function (Modules) {
        var random = DreamsArk.Helpers.random;
        var query = DreamsArk.Helpers.query;
        var where = DreamsArk.Helpers.where;
        var removeById = DreamsArk.Helpers.removeById;
        var Mouse = (function () {
            function Mouse() {
                this.enabled = true;
                this.x = 0;
                this.y = 0;
                this.ratio = new THREE.Vector2(0, 0);
                this.normalized = new THREE.Vector2(0, 0);
                this.screen = new THREE.Vector2(0, 0);
                this.enabled = true;
            }
            Mouse.prototype.configure = function () {
                var callback = function (event) {
                    /**
                     * if not enabled then destroy it
                     */
                    if (!this.enabled)
                        return this.destroy();
                    var browser = DreamsArk.module('Browser');
                    this.x = event.clientX;
                    this.y = event.clientY;
                    /**
                     * Normalized
                     * @type {number}
                     */
                    var x = (event.clientX / browser.innerWidth) * 2 - 1, y = -(event.clientY / browser.innerHeight) * 2 + 1;
                    this.normalized.set(x, y);
                    this.ratio.x = event.clientX / browser.innerWidth;
                    this.ratio.y = event.clientY / browser.innerHeight;
                    /**
                     * Screen
                     */
                    this.screen.set(event.clientX - browser.innerWidth / 2, event.clientY - browser.innerHeight / 2);
                };
                /**
                 * Manually Create Mouse Movement
                 */
                Events.add('window', 'mousemove', callback, this, false);
            };
            Mouse.prototype.click = function (element, callback, context, useCapture) {
                if (context === void 0) { context = this; }
                if (useCapture === void 0) { useCapture = false; }
                Events.add(element, 'click', callback, context, useCapture);
            };
            Mouse.prototype.move = function (element, callback, context, useCapture) {
                if (context === void 0) { context = this; }
                if (useCapture === void 0) { useCapture = false; }
                Events.add(element, 'mousemove', callback, context, useCapture);
            };
            return Mouse;
        })();
        Modules.Mouse = Mouse;
        var Event = (function () {
            function Event(id, event, domElement, callback, useCapture) {
                this.id = id;
                this.event = event;
                this.domElement = domElement;
                this.callback = callback;
                this.useCapture = useCapture;
            }
            return Event;
        })();
        var Events = (function () {
            function Events() {
                this.instance = this;
            }
            Events.add = function (element, event, callback, context, useCapture) {
                if (context === void 0) { context = DreamsArk; }
                if (useCapture === void 0) { useCapture = false; }
                this.assign(event, element, callback, context, useCapture);
            };
            Events.assign = function (event, element, callback, context, useCapture) {
                if (context === void 0) { context = DreamsArk; }
                if (useCapture === void 0) { useCapture = false; }
                var domElement = (element === 'window') ? window : query(element), id = random.id();
                var caller = function (e) {
                    if (callback.call(context, e))
                        Events.remove(id);
                };
                domElement.addEventListener(event, caller, false);
                /**
                 * Store on collection for removal later
                 */
                this.collection.push(new Event(id, event, domElement, caller, useCapture));
            };
            Events.remove = function (id) {
                var element = where.id(this.collection, id);
                element.domElement.removeEventListener(element.event, element.callback, element.useCapture);
                /**
                 * Remove From Collection
                 */
                removeById(this.collection, id);
            };
            Events.collection = [];
            return Events;
        })();
        Modules.Events = Events;
    })(Modules = DreamsArk.Modules || (DreamsArk.Modules = {}));
})(DreamsArk || (DreamsArk = {}));
var DreamsArk;
(function (DreamsArk) {
    var Modules;
    (function (Modules) {
        var Camera = (function () {
            function Camera() {
                this.instance = new THREE.PerspectiveCamera();
            }
            Camera.prototype.configure = function () {
                var browser = DreamsArk.module('Browser');
                this.instance.fov = 75;
                this.instance.aspect = browser.innerWidth / browser.innerHeight;
                this.instance.near = 0.1;
                this.instance.far = 1000;
                this.instance.updateProjectionMatrix();
            };
            Camera.swing = function (target) {
                var mouse = DreamsArk.module('Mouse'), browser = DreamsArk.module('Browser'), checker = DreamsArk.module('Checker'), camera = DreamsArk.module('Camera');
                var origin = new THREE.Vector3(0, 0, 0);
                checker.add(function () {
                    var x = (mouse.ratio.x * 200 - 100 - camera.position.x), y = -(mouse.ratio.y * 200 - 100) / (browser.innerWidth / browser.innerHeight);
                    camera.position.x += (x + camera.position.x) / 30;
                    camera.position.y += (y - camera.position.y + origin.y) / 30;
                    camera.lookAt(target);
                    return false;
                });
            };
            return Camera;
        })();
        Modules.Camera = Camera;
    })(Modules = DreamsArk.Modules || (DreamsArk.Modules = {}));
})(DreamsArk || (DreamsArk = {}));
var DreamsArk;
(function (DreamsArk) {
    var Modules;
    (function (Modules) {
        var Scene = (function () {
            function Scene() {
                this.instance = new THREE.Scene();
            }
            Scene.prototype.configure = function () {
                this.instance.fog = new THREE.Fog(0x000000, 1, 400);
            };
            return Scene;
        })();
        Modules.Scene = Scene;
    })(Modules = DreamsArk.Modules || (DreamsArk.Modules = {}));
})(DreamsArk || (DreamsArk = {}));
var DreamsArk;
(function (DreamsArk) {
    var Modules;
    (function (Modules) {
        var Renderer = (function () {
            function Renderer() {
                this.instance = new THREE.WebGLRenderer({
                    alpha: true
                });
            }
            Renderer.prototype.configure = function () {
                var domElement = this.instance.domElement;
                domElement.style.position = 'absolute';
                domElement.style.zIndex = '2';
                DreamsArk.Helpers.appendTo('#container', domElement);
                /**
                 * Get Global Browser settings
                 */
                var browser = DreamsArk.module('Browser');
                //this.setClearColor(scene.a.fog.color);
                this.instance.setPixelRatio(browser.devicePixelRatio);
                this.instance.setSize(browser.innerWidth, browser.innerHeight);
            };
            return Renderer;
        })();
        Modules.Renderer = Renderer;
    })(Modules = DreamsArk.Modules || (DreamsArk.Modules = {}));
})(DreamsArk || (DreamsArk = {}));
var DreamsArk;
(function (DreamsArk) {
    var Compositions;
    (function (Compositions) {
        var Landing = (function () {
            function Landing() {
            }
            Landing.prototype.elements = function () {
                return ['Logo', 'Ren'];
            };
            Landing.prototype.setup = function (scene, camera, elements) {
                var logo = elements.Logo, ren = elements.Ren;
                logo.scale.subScalar(0.977);
                logo.position.setX(0.5);
                logo.position.setY(1);
                ren.scale.subScalar(0.977);
                ren.position.setX(0.5);
                ren.position.setY(1);
                ren.position.setZ(0.2);
                scene.add(logo, ren);
                camera.position.z = 30;
            };
            Landing.prototype.update = function (scene, camera, elements) {
            };
            return Landing;
        })();
        Compositions.Landing = Landing;
    })(Compositions = DreamsArk.Compositions || (DreamsArk.Compositions = {}));
})(DreamsArk || (DreamsArk = {}));
/// <reference path="Helpers.ts" />
/// <reference path="elements/Tunnel.ts" />
/// <reference path="elements/Skybox.ts" />
/// <reference path="elements/Plexus.ts" />
/// <reference path="elements/Particles.ts" />
/// <reference path="elements/Background.ts" />
/// <reference path="elements/Logo.ts" />
/// <reference path="elements/Ren.ts" />
/// <reference path="elements/Asteroid.ts" />
/// <reference path="elements/Galaxy.ts" />
/// <reference path="elements/Overlay1.ts" />
/// <reference path="elements/Overlay2.ts" />
/// <reference path="elements/Cube.ts" />
/// <reference path="modules/Browser.ts" />
/// <reference path="modules/Checker.ts" />
/// <reference path="modules/Animator.ts" />
/// <reference path="modules/Loader.ts" />
/// <reference path="modules/Mouse.ts" />
/// <reference path="modules/Camera.ts" />
/// <reference path="modules/Scene.ts" />
/// <reference path="modules/Renderer.ts" />
/// <reference path="compositions/Landing.ts" />
var DreamsArk;
(function (DreamsArk) {
    var is = DreamsArk.Helpers.is;
    var query = DreamsArk.Helpers.query;
    var init = DreamsArk.Helpers.init;
    var Loader = DreamsArk.Modules.Loader;
    /**
     * Debug Mode
     * @type {boolean}
     */
    DreamsArk.debug = false;
    DreamsArk.elementsBag = {};
    DreamsArk.core = {
        active: {
            composition: null
        }
    };
    var App = (function () {
        function App() {
            var mouse = DreamsArk.module('Mouse');
            /**
             * start Loading the basic scene
             */
            DreamsArk.load();
            mouse.click('#start', function () {
                DreamsArk.start();
                return true;
            });
            mouse.click('#skip', function () {
                query('form').submit();
                return true;
            });
        }
        return App;
    })();
    DreamsArk.App = App;
    DreamsArk.start = function () {
        /**
         * Remove logo
         */
        //query('.container-fluid').classList.add('--fade-to-black');
        //query('.enter-page').classList.add('--exit');
        var composition = new Composition('Loading');
        DreamsArk.render();
    };
    DreamsArk.load = function () {
        /**
         * Parallax
         */
        var scene = document.getElementById('scene');
        var parallax = new Parallax(scene, {
            limitX: 30
        });
        new Composition('Landing');
        DreamsArk.render();
    };
    DreamsArk.render = function () {
        requestAnimationFrame(DreamsArk.render);
        var renderer = DreamsArk.module('Renderer'), scene = DreamsArk.module('Scene'), camera = DreamsArk.module('Camera'), checker = DreamsArk.module('Checker');
        if (!is.Null(DreamsArk.core.active.composition))
            if (DreamsArk.core.active.composition.update)
                DreamsArk.core.active.composition.update(scene, camera, DreamsArk.core.active.composition.elementsBag);
        checker.update();
        renderer.render(scene, camera);
    };
    /**
     * Get Initializable and initialize it if is not initialized before
     * @param module
     * @returns {*}
     */
    DreamsArk.module = function (module) {
        /**
         * Return Null if doesn't exist
         */
        if (is.Null(DreamsArk.Modules[module]))
            return console.log('module ' + module + ' couldn\'t be found');
        /**
         * if Module is not initialized then init it
         */
        if (is.Null(DreamsArk.Modules[module].instance))
            init([DreamsArk.Modules[module]]);
        return DreamsArk.Modules[module].instance;
    };
    DreamsArk.element = function (name) {
        if (is.Null(DreamsArk.elementsBag[name])) {
            console.log('Element ' + name + ' doesn\'t exist or it wasn\'t loaded.');
            return;
        }
        return DreamsArk.elementsBag[name];
    };
    var Composition = (function () {
        function Composition(name) {
            this.name = name;
            if (is.Null(DreamsArk.Compositions[name])) {
                console.log('Composition: ' + name + ' not found.');
                return;
            }
            var loader = new Loader, scene = DreamsArk.module('Scene'), camera = DreamsArk.module('Camera'), composition = new DreamsArk.Compositions[name], ready = function (elements) {
                composition.setup(scene, camera, elements);
                /**  should merge the elements here */
                composition.elementsBag = elements;
                DreamsArk.core.active.composition = composition;
            };
            if (!is.Null(composition.elements))
                loader.Load(composition.elements(), ready);
        }
        return Composition;
    })();
    DreamsArk.Composition = Composition;
})(DreamsArk || (DreamsArk = {}));
/**
 * Start App
 */
new DreamsArk.App();
document.querySelector('body').style.backgroundColor;
000;
var DreamsArk;
(function (DreamsArk) {
    var Compositions;
    (function (Compositions) {
        var For = DreamsArk.Helpers.For;
        var deg2rad = DreamsArk.Helpers.deg2rad;
        var query = DreamsArk.Helpers.query;
        var Loading = (function () {
            function Loading() {
            }
            Loading.prototype.elements = function () {
                return ['Particles', 'Tunnel', 'Skybox', 'Asteroid'];
            };
            Loading.prototype.setup = function (scene, camera, elements) {
                var animator = DreamsArk.module('Animator'), mouse = DreamsArk.module('Mouse');
                var logo = elements.Logo, ren = elements.Ren, asteroid = elements.Asteroid, particles = elements.Particles, tunnel = elements.Tunnel, skybox = elements.Skybox, domBackground = query('.enter-page'), domTransistor = query('#transistor'), domLogo = query('#logo');
                /**
                 * Setups
                 * @type {{init: (function(): void), timer: null, speed: null, update: (function(): void)}}
                 */
                tunnel.userData = {
                    init: function () {
                        this.timer = new THREE.Clock();
                        this.speed = new THREE.Vector2(0, -4);
                    },
                    timer: null,
                    speed: null,
                    update: function () {
                        var tunnelTexture = tunnel.material.alphaMap;
                        tunnelTexture.offset.x = -this.timer.getElapsedTime() / 6 * this.speed.x;
                        tunnelTexture.offset.y = -this.timer.getElapsedTime() / 2 * this.speed.y;
                        tunnel.material.color.setHSL(Math.abs(Math.cos((this.timer.getElapsedTime() / 10))), 1, 0.5);
                    }
                };
                /**
                 * Return Camera to Default
                 */
                animator.expoOut({
                    destination: {
                        position: new THREE.Vector3(0, 0, 30),
                        rotation: new THREE.Vector3(0, 0, 0)
                    },
                    origin: {
                        position: camera.position,
                        rotation: camera.rotation.toVector3(),
                    },
                    duration: 1,
                    update: function (params) {
                        camera.position.copy(params.position);
                        camera.rotation.setFromVector3(params.rotation);
                    }
                });
                /**
                 * Lift Ren
                 */
                animator.expoOut({
                    destination: new THREE.Vector3(0.5, 1, 3),
                    origin: ren.position,
                    duration: 1,
                    update: function (params) {
                        ren.position.copy(params);
                    }
                });
                /**
                 * Enters Skybox
                 */
                var animEnterSkybox = animator.expoIn({
                    destination: {
                        opacity: 1,
                        zoom: 1,
                        fog: 100000,
                        far: 100000,
                    },
                    origin: {
                        opacity: 0,
                        zoom: 0.02 /** camera zoom */,
                        fog: scene.fog.far,
                        far: camera.far
                    },
                    duration: 3,
                    autoStart: false,
                    update: function (params) {
                        skybox.material.opacity = params.opacity;
                        camera.zoom = params.zoom;
                        camera.far = params.far;
                        camera.updateProjectionMatrix();
                        scene.fog.far = params.fog;
                    },
                    complete: function () {
                        var browser = DreamsArk.module('Browser'), renderer = DreamsArk.module('Renderer');
                        scene.remove(tunnel, particles, logo, ren);
                        new DreamsArk.Composition('Universe');
                    }
                });
                /**
                 * Leave Tunnel
                 */
                var animLeaveTunnel = animator.expoIn({
                    destination: {
                        tunnel: new THREE.Vector3(0, -600, 0),
                        logo: new THREE.Vector3(0, 200, 0)
                    },
                    origin: {
                        tunnel: tunnel.position,
                        logo: logo.position
                    },
                    duration: 3,
                    delay: 5,
                    autoStart: false,
                    update: function (params) {
                        tunnel.position.copy(params.tunnel);
                        logo.position.copy(params.logo);
                        ren.position.copy(params.logo);
                    },
                    complete: function () {
                        animEnterSkybox.init();
                    }
                });
                /**
                 * Zoom In Camera
                 */
                var animCameraZoomIn = animator.expoIn({
                    destination: {
                        zoom: 0.2,
                    },
                    origin: {
                        zoom: camera.zoom
                    },
                    duration: 2,
                    autoStart: false,
                    update: function (param) {
                        camera.zoom = param.zoom;
                        camera.updateProjectionMatrix();
                    },
                    complete: function () {
                        animLeaveTunnel.init();
                    }
                });
                /**
                 * Enter Tunnel
                 */
                var animEnterTunnel = animator.expoIn({
                    destination: {
                        opacity: 0.8,
                        rotation: new THREE.Vector3(deg2rad(90), 0, 0),
                        position: new THREE.Vector3(0, 0, 0),
                        logo: new THREE.Vector3(0, 10, -2),
                    },
                    origin: {
                        opacity: tunnel.material.opacity,
                        rotation: tunnel.rotation.toVector3(),
                        position: camera.position,
                        logo: logo.position,
                    },
                    duration: 5,
                    autoStart: false,
                    start: function () {
                        tunnel.userData.init();
                        logo.userData.mouse.inverse = true;
                    },
                    update: function (params) {
                        tunnel.material.opacity = params.opacity * 3;
                        camera.rotation.setFromVector3(params.rotation);
                        camera.position.copy(params.position);
                        logo.position.copy(params.logo);
                        ren.position.copy(params.logo);
                        /**
                         * Enable movement on the way up
                         */
                        if (logo.userData.mouse.enabled === true) {
                            logo.position.z = params.logo.z + -mouse.screen.y * logo.userData.mouse.speed.z;
                            ren.position.z = params.logo.z + -mouse.screen.y * logo.userData.mouse.speed.z;
                        }
                    },
                    complete: function () {
                        animCameraZoomIn.init();
                        particles.material = particles.userData.particleFrontMaterial;
                        /**
                         * Remove Unnecessary elements
                         */
                        scene.remove(asteroid);
                    }
                });
                /**
                 * throw logo up
                 */
                var animFadeParticles = animator.expoOut({
                    destination: { opacity: 0.5 },
                    duration: 2,
                    autoStart: false,
                    update: function (param) {
                        particles.material.opacity = param.opacity;
                    }
                });
                var animSlideAsteroidDown = animator.sineIn({
                    destination: {
                        position: new THREE.Vector3(-10, -40, 0),
                        opacity: 1
                    },
                    origin: {
                        position: asteroid.position.set(-10, 20, 0),
                        opacity: asteroid.material.opacity = 0
                    },
                    autoStart: false,
                    duration: 9,
                    start: function () {
                        scene.add(asteroid);
                    },
                    update: function (params) {
                        if (params.opacity * 9 % 10 <= 1) {
                            asteroid.material.opacity = params.opacity * 9 % 10;
                        }
                        asteroid.position.copy(params.position);
                    }
                });
                var animThrowLogoUp = animator.expoOut({
                    destination: {
                        logo: { y: 10 },
                        ren: { y: 10 },
                        camera: { y: 10 }
                    },
                    origin: {
                        logo: logo.position,
                        ren: ren.position,
                        camera: camera.position
                    },
                    duration: 5,
                    autoStart: false,
                    start: function () {
                        var browser = DreamsArk.module('Browser');
                        animFadeParticles.init();
                        particles.userData.start = true;
                        /**
                         * Enable Mouse Movement
                         */
                        logo.userData.mouse.enabled = true;
                        /**
                         * Slide doom elements down
                         */
                        //domLogo.style.top = '110%';
                        domBackground.style.top = '100%';
                        domTransistor.style.display = 'block';
                        animSlideAsteroidDown.init();
                    },
                    update: function (params) {
                        /**
                         * Enable movement on the way up
                         */
                        if (logo.userData.mouse.enabled === true) {
                            logo.position.y = params.logo.y + -mouse.screen.y * logo.userData.mouse.speed.y;
                            ren.position.y = params.ren.y + -mouse.screen.y * logo.userData.mouse.speed.y;
                        }
                        camera.position.setY(params.camera.y);
                    },
                    complete: function () {
                        animEnterTunnel.init();
                        domBackground.remove();
                    }
                });
                var animRenBackIn = animator.backOut({
                    destination: new THREE.Vector3(0.5, 1, 0.2),
                    origin: ren.position,
                    duration: 0.2,
                    autoStart: false,
                    update: function (params) {
                        ren.position.copy(params);
                    },
                    complete: function () {
                        animThrowLogoUp.init();
                    }
                });
                /**
                 * Rotate logo
                 */
                animator.sineInOut({
                    destination: {
                        rotation: deg2rad(360) * 4
                    },
                    origin: {
                        rotation: logo.rotation.y
                    },
                    duration: 2,
                    delay: 0.5,
                    update: function (params) {
                        logo.rotation.y = params.rotation;
                    },
                    complete: function () {
                        animRenBackIn.init();
                    }
                });
                scene.add(particles, tunnel, skybox);
            };
            Loading.prototype.update = function (scene, camera, elements) {
                var mouse = DreamsArk.module('Mouse');
                var particles = elements.Particles, particlesPositions = particles.geometry.attributes.position, particlesVelocities = particles.userData.velocity;
                particles.position.y = camera.position.y;
                if (particles.userData.start === true)
                    For(particlesPositions.count, function (i) {
                        if (particlesPositions.array[i * 3 + 1] < -80)
                            particlesPositions.array[i * 3 + 1] = 80;
                        particlesPositions.array[i * 3 + 1] -= particlesVelocities[i].y / 2;
                    });
                particlesPositions.needsUpdate = true;
                var logo = elements.Logo, ren = elements.Ren;
                if (logo.userData.mouse.enabled === true && logo.userData.mouse.inverse === false) {
                    logo.position.x = ren.position.x = mouse.screen.x * logo.userData.mouse.speed.x;
                    logo.position.y = ren.position.y = -mouse.screen.y * logo.userData.mouse.speed.y + camera.position.y;
                }
                if (logo.userData.mouse.enabled === true && logo.userData.mouse.inverse === true) {
                    logo.position.x = ren.position.x = mouse.screen.x * logo.userData.mouse.speed.x;
                    logo.position.z = ren.position.z = -mouse.screen.y * logo.userData.mouse.speed.z;
                }
                /**
                 * Tunnel
                 */
                var tunnel = elements.Tunnel;
                if (tunnel.userData.timer !== null)
                    tunnel.userData.update();
                /**
                 * Controls
                 */
                var skybox = elements.Skybox;
                if (skybox.userData.controls)
                    skybox.userData.controls.update();
            };
            return Loading;
        })();
        Compositions.Loading = Loading;
    })(Compositions = DreamsArk.Compositions || (DreamsArk.Compositions = {}));
})(DreamsArk || (DreamsArk = {}));
var DreamsArk;
(function (DreamsArk) {
    var Compositions;
    (function (Compositions) {
        var For = DreamsArk.Helpers.For;
        var Universe = (function () {
            function Universe() {
            }
            Universe.prototype.elements = function () {
                return ['Plexus'];
            };
            Universe.prototype.setup = function (scene, camera, elements) {
                var animator = DreamsArk.module('Animator'), renderer = DreamsArk.module('Renderer'), browser = DreamsArk.module('Browser');
                var logo = elements.Logo, tunnel = elements.Tunnel, plexus = elements.Plexus, skybox = elements.Skybox;
                skybox.userData.controls = new THREE.TrackballControls(camera, renderer.domElement);
                skybox.userData.controls.target.set(0, browser.innerHeight, -1);
                //skybox.userData.controls.update();
                /**
                 * Center Camera
                 */
                animator.circOut({
                    destination: {
                        position: new THREE.Vector3(0, 0, 50),
                        rotation: new THREE.Vector3(0, 0, 0)
                    },
                    origin: {
                        position: camera.position,
                        rotation: camera.rotation.toVector3()
                    },
                    duration: 3,
                    update: function (params) {
                        //camera.position.copy(params.position);
                        //camera.rotation.setFromVector3(params.rotation);
                    }
                });
                /**
                 * Speed up Logo
                 */
                animator.expoIn({
                    destination: new THREE.Vector3(0, 0, -800),
                    origin: logo.position,
                    duration: 5,
                    update: function (params) {
                        //logo.position.copy(params)
                    }
                });
                /**
                 * Remove Tunnel
                 */
                animator.expoIn({
                    destination: new THREE.Vector3(0, 0, 800),
                    origin: tunnel.position,
                    duration: 5,
                    update: function (params) {
                        //tunnel.position.copy(params)
                    }
                });
                /**
                 * Go to Target
                 */
                animator.expoIn({
                    destination: {
                        target: new THREE.Vector3(0, 0, 0)
                    },
                    origin: {
                        target: skybox.userData.controls.target
                    },
                    duration: 2,
                    update: function (params) {
                        skybox.userData.controls.target.copy(params.target);
                    }
                });
                scene.add(plexus);
            };
            Universe.prototype.update = function (scene, camera, elements) {
                var skybox = elements.Skybox;
                /**
                 * Controls
                 */
                if (skybox.userData.controls)
                    skybox.userData.controls.update();
                var hex = elements.Plexus.userData.hex, hexBag = elements.Plexus.userData.hexBag, hexPositions = hex.geometry.attributes.position, distance = 100, speed = 10;
                For(hexPositions.count, function (i) {
                    hexPositions.array[i * 3] += hexBag[i].velocity.x / speed;
                    hexPositions.array[i * 3 + 1] += hexBag[i].velocity.y / speed;
                    hexPositions.array[i * 3 + 2] += hexBag[i].velocity.z / speed;
                    if (hexPositions.array[i * 3 + 1] < -distance || hexPositions.array[i * 3 + 1] > distance)
                        hexBag[i].velocity.y = -hexBag[i].velocity.y;
                    if (hexPositions.array[i * 3] < -distance || hexPositions.array[i * 3] > distance)
                        hexBag[i].velocity.x = -hexBag[i].velocity.x;
                    if (hexPositions.array[i * 3 + 2] < -distance || hexPositions.array[i * 3 + 2] > distance)
                        hexBag[i].velocity.z = -hexBag[i].velocity.z;
                });
                hexPositions.needsUpdate = true;
            };
            return Universe;
        })();
        Compositions.Universe = Universe;
    })(Compositions = DreamsArk.Compositions || (DreamsArk.Compositions = {}));
})(DreamsArk || (DreamsArk = {}));
var DreamsArk;
(function (DreamsArk) {
    var Elements;
    (function (Elements) {
        var Planet = (function () {
            function Planet() {
            }
            Planet.prototype.maps = function () {
                return {
                    planet: 'assets/transition-assets/planet.png'
                };
            };
            Planet.prototype.create = function (maps, objs, data) {
                var geometry = new THREE.PlaneGeometry(1024 / 20, 1024 / 20, 1);
                var material = new THREE.MeshBasicMaterial({
                    side: THREE.DoubleSide,
                    map: maps.planet,
                    transparent: true,
                    blending: THREE.AdditiveBlending
                });
                return new THREE.Mesh(geometry, material);
            };
            return Planet;
        })();
        Elements.Planet = Planet;
    })(Elements = DreamsArk.Elements || (DreamsArk.Elements = {}));
})(DreamsArk || (DreamsArk = {}));
var DreamsArk;
(function (DreamsArk) {
    var Elements;
    (function (Elements) {
        var For = DreamsArk.Helpers.For;
        var random = DreamsArk.Helpers.random;
        var Plexus2 = (function () {
            function Plexus2() {
            }
            Plexus2.prototype.data = function () {
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
                };
            };
            Plexus2.prototype.maps = function () {
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
                };
            };
            Plexus2.prototype.create = function (maps, objs, data) {
                var group = new THREE.Group(), cores = new THREE.BufferGeometry(), corePositions = new Float32Array(data.core * 3), coreMaterial = new THREE.PointsMaterial({
                    map: maps.core,
                    size: 10,
                    transparent: true,
                    alphaTest: 0.5,
                    sizeAttenuation: true,
                }), coreLines = new THREE.BufferGeometry(), coreLinePositions = new Float32Array((data.core * 2) * 3 - data.core), coreLineMaterial = new THREE.LineBasicMaterial({
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
                    index++;
                });
                cores.addAttribute('position', new THREE.BufferAttribute(corePositions, 3).setDynamic(true));
                coreLines.addAttribute('position', new THREE.BufferAttribute(coreLinePositions, 3).setDynamic(true));
                var core = new THREE.Points(cores, coreMaterial), coreLine = new THREE.LineSegments(coreLines, coreLineMaterial);
                group.add(core);
                group.add(coreLine);
                return group;
            };
            return Plexus2;
        })();
        Elements.Plexus2 = Plexus2;
    })(Elements = DreamsArk.Elements || (DreamsArk.Elements = {}));
})(DreamsArk || (DreamsArk = {}));
var Scene = DreamsArk.Modules.Scene;
var Camera = DreamsArk.Modules.Camera;
//# sourceMappingURL=tsc.js.map