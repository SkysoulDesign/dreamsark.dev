/**
 * Helpful functions designed to assist on optimization and less duplication of code
 */
var DreamsArk;
(function (DreamsArk) {
    var Helpers;
    (function (Helpers) {
        /**
         * Init components in mass
         * @param items - items to be initialized
         */
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
        /**
         * Get DOM Element
         * @param element - a full qualified DOM element selector (#element, .element, tag)
         * @returns Element
         */
        Helpers.query = function (element) {
            return document.querySelector(element);
        };
        /**
         * Loop trough items and call callbacks for each
         * @param items - array of elements to be looped
         * @param callback - callback to be call on each element
         * @param context - context for this inside the callback
         */
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
        /**
         * Loop with a designated amount of interactions
         * @param max - max number of loops to me performed can be (number|array)
         * @param callback - function to be call on each interaction
         * @param context - context for this inside the callback
         * @param reverse - if the loop should be backwards
         */
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
        /**
         * Check length of a given item
         *
         * @param item - can be (array|object)
         * @returns result
         */
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
        /**
         * Check if a given items contains an element on it's hierarchy
         *
         * @param items - can be (array|object)
         * @param element - element to be matched
         */
        Helpers.contains = function (items, element) {
            if (is.Array(items))
                return items.indexOf(element) > -1;
            if (is.Object(items))
                console.log('is Object Please finish implementing this function');
            return false;
        };
        /**
         * Reverse an array
         * @param items - array to be reversed
         */
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
         * Append element to an DOM element
         *
         * @param element - DOM element to be Appended To
         * @param domElement - DOM element to receive the element
         */
        Helpers.appendTo = function (element, domElement) {
            document.querySelector(element).appendChild(domElement);
        };
        /**
         * Remove items by id
         * @param collection - items to be checked
         * @param id of element to be removed
         */
        Helpers.removeById = function (collection, id) {
            Helpers.For(collection, function (index) {
                if (collection[index].id === id)
                    collection.splice(index, 1);
            });
        };
        /**
         * Create a timeout to a designed function be executed
         *
         * @param time in milliseconds
         * @param callback - function to be called on a timeout
         * @param context - context of this inside the callback
         */
        Helpers.timeout = function (time, callback, context) {
            if (context === void 0) { context = DreamsArk; }
            return window.setTimeout(callback.bind(context), time * 1000);
        };
        /**
         * Clone an object
         *
         * @param obj - object to be cloned
         * @param skip - an array of strings to represent properties to be skipped
         */
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
        /**
         * Map every property of an object
         *
         * @param obj - to be checked
         * @param callback - callback to be call on every property
         * @param context - context to be applied on the callback
         */
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
        /**
         * Convert degrees to radians
         */
        Helpers.deg2rad = function (degrees) {
            return (degrees * Math.PI / 180);
        };
        /**
         * Checker if obj is of a X type
         */
        var is = (function () {
            function is() {
            }
            /**
             * Check if it's an Array
             */
            is.Array = function (item) {
                return Array.isArray(item);
            };
            /**
             * Check if it's an Object
             */
            is.Object = function (item) {
                return (typeof item === "object" && !Array.isArray(item) && item !== null);
            };
            /**
             * Check if it's Null
             */
            is.Null = function (item) {
                return (item === null || item === undefined || item === 0 || item === '0');
            };
            /**
             * Check if it's a Function
             */
            is.Function = function (item) {
                return !!(item && item.constructor && item.call && item.apply);
            };
            /**
             * Check if it's an Image
             */
            is.Image = function (item) {
                var ext = item.split('.').pop();
                return (ext === 'jpg' || ext === 'png');
            };
            /**
             * Check if it's an Obj
             */
            is.OBJ = function (item) {
                var ext = item.split('.').pop();
                return (ext === 'obj');
            };
            return is;
        }());
        Helpers.is = is;
        /**
         * Generate random elements
         */
        var random = (function () {
            function random() {
            }
            /**
             * Generate random number between a given min abd nax
             */
            random.between = function (min, max) {
                return Math.floor((Math.random() * ((max + 1) - min)) + min);
            };
            /**
             * Generate a random 7 length long random Strings
             */
            random.id = function (length, radix) {
                if (length === void 0) { length = 27; }
                if (radix === void 0) { radix = 36; }
                return (Math.random() + 1).toString(radix).substring(2, length + 2);
            };
            /**
             * Generate Random Vector3 object
             * @param x - number
             * @param y - number
             * @param z - number
             * @param distance or radius
             * @param stick - stick to a surface or get free-style
             */
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
        }());
        Helpers.random = random;
        /**
         * Get items where X = Y
         */
        var where = (function () {
            function where() {
            }
            /**
             * Get item where Item = an given id
             */
            where.id = function (collection, id) {
                var occurrence = [];
                Helpers.each(collection, function (element) {
                    if (element.id === id)
                        occurrence = element;
                });
                return occurrence;
            };
            /**
             * Get item where Item = an given name
             */
            where.name = function (collection, id) {
                var occurrences = [];
                Helpers.each(collection, function (element) {
                    if (element.id === id)
                        occurrences.push(element);
                });
                return Helpers.length(occurrences) > 0 ? occurrences[0] : occurrences;
            };
            return where;
        }());
        Helpers.where = where;
        /**
         * Math Helper Classes
         */
        var math = (function () {
            function math() {
                /**
                 * Execute basic math logic on objects properties recursively
                 */
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
            /**
             * Subtraction
             */
            math.sub = function (origin, obj) {
                return (new math).calculator(origin, obj, '-');
            };
            /**
             * Addition
             */
            math.add = function (origin, obj) {
                return (new math).calculator(origin, obj, '+');
            };
            /**
             * Multiplication
             */
            math.multiply = function (origin, obj) {
                return (new math).calculator(origin, obj, '*');
            };
            /**
             * Division
             */
            math.divide = function (origin, obj) {
                return (new math).calculator(origin, obj, '/');
            };
            return math;
        }());
        Helpers.math = math;
    })(Helpers = DreamsArk.Helpers || (DreamsArk.Helpers = {}));
})(DreamsArk || (DreamsArk = {}));
var DreamsArk;
(function (DreamsArk) {
    var Elements;
    (function (Elements) {
        var deg2rad = DreamsArk.Helpers.deg2rad;
        var EnterPage = (function () {
            function EnterPage() {
            }
            EnterPage.prototype.maps = function () {
                return {
                    background: 'intro/enter-page-assets/background.png',
                    transition: 'intro/enter-page-assets/transition.png',
                    galaxy: 'intro/enter-page-assets/galaxy.png',
                    tunnelBG: 'intro/enter-page-assets/tunnelBG.png',
                    platform: 'intro/enter-page-assets/platform.png',
                    start: 'intro/enter-page-assets/start.png',
                    skip: 'intro/enter-page-assets/skip.png',
                    planet: 'intro/enter-page-assets/planet.png',
                };
            };
            EnterPage.prototype.data = function () {
                return {
                    start: function () {
                    },
                    layers: {}
                };
            };
            EnterPage.prototype.create = function (maps, objs, data) {
                var browser = DreamsArk.module('Browser'), mouse = DreamsArk.module('Mouse'), group = new THREE.Group();
                /**
                 * Background
                 */
                var geometry = new THREE.PlaneGeometry(2048 / 1.5, 1024 / 1.5, 1), material = new THREE.MeshBasicMaterial({ map: maps.background }), background = data.layers.background = new THREE.Mesh(geometry, material);
                background.position.setZ(-200);
                group.add(background);
                /**
                 * Transition
                 */
                var geometry = new THREE.PlaneGeometry(2048 / 1.5, 1024 / 1.5, 1), material = new THREE.MeshBasicMaterial({ map: maps.transition }), transition = data.layers.transition = new THREE.Mesh(geometry, material);
                transition.position.set(0, geometry.parameters.height - 0.9, -200);
                group.add(transition);
                /**
                 * Galaxy
                 */
                var geometry = new THREE.PlaneGeometry(2048 / 1.5, 1024 / 1.5, 1), material = new THREE.MeshBasicMaterial({ map: maps.galaxy }), galaxy = data.layers.galaxy = new THREE.Mesh(geometry, material);
                galaxy.position.set(0, (geometry.parameters.height * 2) - 0.9, -200);
                group.add(galaxy);
                /**
                 * TunnelBG
                 */
                var geometry = new THREE.PlaneGeometry(2048 / 1.5, 1024 / 1.5, 1), material = new THREE.MeshBasicMaterial({ map: maps.tunnelBG, transparent: true, side: THREE.DoubleSide }), tunnelBG = data.layers.tunnelBG = new THREE.Mesh(geometry, material);
                tunnelBG.position.set(0, geometry.parameters.height * 3 - geometry.parameters.height / 2, 0);
                tunnelBG.rotation.x = deg2rad(90);
                group.add(tunnelBG);
                /**
                 * Planet
                 */
                var geometry = new THREE.PlaneGeometry(10, 10, 1), material = new THREE.MeshBasicMaterial({ map: maps.planet, transparent: true, alphaTest: 0.01 }), planet = data.layers.planet = new THREE.Mesh(geometry, material);
                planet.position.set(-30, 10, 0);
                group.add(planet);
                /**
                 * Platform
                 */
                var geometry = new THREE.PlaneGeometry(60, 60, 1), material = new THREE.MeshBasicMaterial({ map: maps.platform, transparent: true, alphaTest: 0.01 }), platform = data.layers.platform = new THREE.Mesh(geometry, material);
                group.add(platform);
                /**
                 * Start
                 */
                var geometry = new THREE.PlaneGeometry(1024 / 55, 256 / 55, 1), material = new THREE.MeshBasicMaterial({ map: maps.start, transparent: true }), start = data.layers.start = new THREE.Mesh(geometry, material);
                /**
                 * Position Fix
                 */
                start.position.set(0, -7, 5);
                mouse.click(start, function () {
                    data.start();
                });
                group.add(start);
                /**
                 * Skip
                 */
                var geometry = new THREE.PlaneGeometry(5, 5, 1), material = new THREE.MeshBasicMaterial({ map: maps.skip, transparent: true }), skip = data.layers.skip = new THREE.Mesh(geometry, material);
                skip.position.set(0, -9, 5);
                group.add(skip);
                data.parallex = function (logo) {
                    var x = mouse.normalized.x, y = mouse.normalized.y;
                    background.position.x = x * 2;
                    background.position.y = y * 2;
                    platform.position.x = x * 5;
                    planet.position.x = -30 + x / 2;
                    start.position.x = x * 7;
                    skip.position.x = x * 6;
                    logo.position.x = x * 10;
                    logo.position.y = y * 2;
                };
                return group;
            };
            return EnterPage;
        }());
        Elements.EnterPage = EnterPage;
    })(Elements = DreamsArk.Elements || (DreamsArk.Elements = {}));
})(DreamsArk || (DreamsArk = {}));
var DreamsArk;
(function (DreamsArk) {
    var Elements;
    (function (Elements) {
        var random = DreamsArk.Helpers.random;
        var For = DreamsArk.Helpers.For;
        var ChaosParticles = (function () {
            function ChaosParticles() {
            }
            ChaosParticles.prototype.data = function () {
                return {
                    velocity: [],
                    layers: {
                        purple: { velocity: [] },
                        pink: { velocity: [] },
                        lilas: { velocity: [] }
                    }
                };
            };
            ChaosParticles.prototype.maps = function () {
                return {
                    particle: 'intro/hex.png',
                };
            };
            ChaosParticles.prototype.create = function (maps, objs, data) {
                var maxParticleCount = 200, radius = 200, group = new THREE.Group();
                var PointPurpleMaterial = new THREE.PointsMaterial({
                    color: 0x351c41,
                    size: 2,
                    blending: THREE.AdditiveBlending,
                    map: maps.particle,
                    transparent: true,
                    alphaTest: 0.01,
                    sizeAttenuation: true,
                    vertexColors: THREE.VertexColors,
                }), PointPinkMaterial = PointPurpleMaterial.clone(), PointLilasMaterial = PointPurpleMaterial.clone();
                PointPinkMaterial.color.setHex(0x7a1762);
                PointLilasMaterial.color.setHex(0xb505ce);
                var particles = new THREE.BufferGeometry(), particlePositions = new Float32Array(maxParticleCount * 3), colors = new Float32Array(maxParticleCount * 3);
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
                    data.layers.purple.velocity.push(new THREE.Vector3(5 * Math.random(), 5 * Math.random(), 5 * Math.random()));
                    data.layers.pink.velocity.push(new THREE.Vector3(5 * Math.random(), 5 * Math.random(), 5 * Math.random()));
                    data.layers.lilas.velocity.push(new THREE.Vector3(5 * Math.random(), 5 * Math.random(), 5 * Math.random()));
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
                    var particles = group, speed = 50, distance = 50, 
                    /**
                     * Purple
                     */
                    purplePositions = data.layers.purple.particles.geometry.attributes.position, purpleVelocities = data.layers.purple.velocity, 
                    /**
                     * Pink
                     */
                    pinkPositions = data.layers.pink.particles.geometry.attributes.position, pinkVelocities = data.layers.pink.velocity, 
                    /**
                     * Lilas
                     */
                    lilasPositions = data.layers.lilas.particles.geometry.attributes.position, lilasVelocities = data.layers.lilas.velocity;
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
            };
            return ChaosParticles;
        }());
        Elements.ChaosParticles = ChaosParticles;
    })(Elements = DreamsArk.Elements || (DreamsArk.Elements = {}));
})(DreamsArk || (DreamsArk = {}));
var DreamsArk;
(function (DreamsArk) {
    var Elements;
    (function (Elements) {
        var Ripple = (function () {
            function Ripple() {
            }
            Ripple.prototype.maps = function () {
                return {
                    beam: 'intro/fxs/ripple.png'
                };
            };
            Ripple.prototype.data = function () {
                return {
                    velocity: [],
                    speed: 0
                };
            };
            Ripple.prototype.create = function (maps, objs, data) {
                var browser = DreamsArk.module('Browser');
                var clock = new THREE.Clock();
                data.animation = new TextureAnimator(maps.beam, 4, 4, 16, 60); // texture, #horiz, #vert, #total, duration.
                function TextureAnimator(texture, tilesHoriz, tilesVert, numTiles, tileDispDuration) {
                    this.tilesHorizontal = tilesHoriz;
                    this.tilesVertical = tilesVert;
                    this.numberOfTiles = numTiles;
                    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
                    texture.repeat.set(1 / this.tilesHorizontal, 1 / this.tilesVertical);
                    texture.offset.set(0 / this.tilesHorizontal, (tilesVert - 1) / this.tilesVertical);
                    this.tileDisplayDuration = tileDispDuration;
                    this.currentDisplayTime = 0;
                    this.currentTile = 0;
                    this.finished = false;
                    this.update = function () {
                        if (this.finished) {
                            texture.repeat.set(0.01, 0.01);
                            return;
                        }
                        var delta = clock.getDelta();
                        this.currentDisplayTime += 1000 * delta;
                        while (this.currentDisplayTime > this.tileDisplayDuration) {
                            this.currentDisplayTime -= this.tileDisplayDuration;
                            this.currentTile++;
                            if (this.currentTile == this.numberOfTiles) {
                                this.currentTile = 0;
                                this.finished = true;
                            }
                            var currentColumn = this.currentTile % this.tilesHorizontal;
                            texture.offset.x = currentColumn / this.tilesHorizontal;
                            var currentRow = Math.abs(Math.floor(this.currentTile / this.tilesHorizontal) - (this.tilesHorizontal - 1));
                            texture.offset.y = currentRow / this.tilesVertical;
                        }
                    };
                }
                var geometry = new THREE.PlaneGeometry(512 / 8, 128 / 8, 1), material = new THREE.MeshBasicMaterial({
                    map: maps.beam,
                    transparent: true,
                    side: THREE.DoubleSide,
                    alphaTest: 0.1,
                    blending: THREE.AdditiveBlending,
                    opacity: 0.5
                });
                var ripple = new THREE.Mesh(geometry, material);
                ripple.scale.set(0.6, 0.6, 0.6);
                return ripple;
            };
            return Ripple;
        }());
        Elements.Ripple = Ripple;
    })(Elements = DreamsArk.Elements || (DreamsArk.Elements = {}));
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
                    wave: 'intro/001_electric.jpg',
                    portal: 'intro/portal-assets/portal.png',
                    beam_1: 'intro/portal-assets/beam_1.png',
                    been_2: 'intro/portal-assets/beam_2.png',
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
        }());
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
                    skybox: 'intro/universe-assets/background-sphere.jpg'
                };
            };
            Skybox.prototype.create = function (maps, objs, data) {
                var geometry = new THREE.SphereGeometry(5000, 50, 50);
                geometry.scale(-1, 1, 1);
                var material = new THREE.MeshBasicMaterial({ map: maps.skybox, transparent: true });
                return new THREE.Mesh(geometry, material);
            };
            return Skybox;
        }());
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
                    core: 'intro/hex-assets/hex.png',
                    point_squad: 'intro/point-squad.png',
                    hexicle: 'intro/hex-assets/hexicle.png',
                    point_1_1: 'intro/hex-assets/point-1.png',
                    point_1_2: 'intro/hex-assets/point-2.png',
                    point_1_3: 'intro/hex-assets/point-3.png',
                    point_1_4: 'intro/hex-assets/point-4.png',
                    point_1_5: 'intro/hex-assets/point-5.png',
                    point_2_1: 'intro/hex-assets/point-4.png',
                    point_2_2: 'intro/hex-assets/point-3.png',
                    point_2_3: 'intro/hex-assets/point-2.png',
                    point_2_4: 'intro/hex-assets/point-1.png',
                    point_2_5: 'intro/hex-assets/point-5.png',
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
        }());
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
                return { particle: 'intro/spark.png', particleFront: 'intro/particle-front.png' };
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
        }());
        Elements.Particles = Particles;
    })(Elements = DreamsArk.Elements || (DreamsArk.Elements = {}));
})(DreamsArk || (DreamsArk = {}));
var DreamsArk;
(function (DreamsArk) {
    var Elements;
    (function (Elements) {
        var deg2rad = DreamsArk.Helpers.deg2rad;
        var random = DreamsArk.Helpers.random;
        var For = DreamsArk.Helpers.For;
        var HexParticles = (function () {
            function HexParticles() {
            }
            HexParticles.prototype.data = function () {
                return {
                    velocity: [],
                    layers: {}
                };
            };
            HexParticles.prototype.maps = function () {
                return {
                    particle: 'intro/hex.png',
                    particleBlur: 'intro/hex-blur.png',
                    particleXBlur: 'intro/hex-x-blur.png'
                };
            };
            HexParticles.prototype.objs = function () {
                return {
                    hex: 'intro/models/hex.obj',
                };
            };
            HexParticles.prototype.create = function (maps, objs, data) {
                var maxParticleCount = 2000, radius = 50, group = new THREE.Group();
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
                    data.velocity.push(new THREE.Vector3(5 * Math.random(), 5 * Math.random(), 5 * Math.random()));
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
                    var particles = group, //elements.HexParticles,
                    particlesPositions = data.layers.inner.geometry.attributes.position, particlesBlurPositions = data.layers.outer.geometry.attributes.position, particlesBlurOutPositions = data.layers.out.geometry.attributes.position, particlesVelocities = particles.userData.velocity;
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
            };
            return HexParticles;
        }());
        Elements.HexParticles = HexParticles;
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
                    overlay: 'intro/planet-assets/bg.jpg',
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
        }());
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
                    logo: 'intro/enter-page-assets/logo-tex.png',
                };
            };
            Logo.prototype.objs = function () {
                return {
                    logo: 'intro/models/logo.obj',
                };
            };
            Logo.prototype.data = function () {
                return { mouse: { speed: new THREE.Vector3(0.02, 0.02, 0.02), enabled: false, inverse: false } };
            };
            Logo.prototype.create = function (maps, objs, data) {
                var logo = objs.logo, texture = maps.logo;
                logo.rotation.x = Math.PI * 2;
                logo.material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
                logo.scale.subScalar(0.6);
                return logo;
            };
            return Logo;
        }());
        Elements.Logo = Logo;
    })(Elements = DreamsArk.Elements || (DreamsArk.Elements = {}));
})(DreamsArk || (DreamsArk = {}));
var DreamsArk;
(function (DreamsArk) {
    var Elements;
    (function (Elements) {
        var deg2rad = DreamsArk.Helpers.deg2rad;
        var TunnelFX = (function () {
            function TunnelFX() {
            }
            TunnelFX.prototype.create = function (maps, objs, data) {
                var video = document.createElement('video');
                video.addEventListener('ended', loop, false);
                function loop(e) {
                    video.play();
                }
                ;
                video.src = "intro/elements/EtherealAura.webmhd.webm";
                video.load(); // must call after setting/changing source
                video.play();
                var videoImage = document.createElement('canvas');
                videoImage.width = 1024;
                videoImage.height = 1024;
                var videoImageContext = videoImage.getContext('2d');
                // background color if no video present
                videoImageContext.fillStyle = '#000000';
                videoImageContext.fillRect(0, 0, videoImage.width, videoImage.height);
                var videoTexture = new THREE.Texture(videoImage);
                videoTexture.minFilter = THREE.LinearFilter;
                videoTexture.magFilter = THREE.LinearFilter;
                var movieMaterial = new THREE.MeshBasicMaterial({
                    map: videoTexture,
                    blending: THREE.AdditiveBlending,
                    alphaTest: 0.5
                });
                var movieGeometry = new THREE.PlaneGeometry(500, 500, 5, 5);
                data.update = function () {
                    if (video.readyState === video.HAVE_ENOUGH_DATA) {
                        videoImageContext.drawImage(video, 0, 0);
                        if (videoTexture)
                            videoTexture.needsUpdate = true;
                    }
                };
                var fx = new THREE.Mesh(movieGeometry, movieMaterial);
                fx.rotation.x = deg2rad(90);
                fx.position.y = 50;
                return fx;
            };
            return TunnelFX;
        }());
        Elements.TunnelFX = TunnelFX;
    })(Elements = DreamsArk.Elements || (DreamsArk.Elements = {}));
})(DreamsArk || (DreamsArk = {}));
var DreamsArk;
(function (DreamsArk) {
    var Elements;
    (function (Elements) {
        var LogoFX = (function () {
            function LogoFX() {
            }
            LogoFX.prototype.maps = function () {
                return {
                    fx: 'intro/elements/LogoFX.png'
                };
            };
            LogoFX.prototype.create = function (maps, objs, data) {
                var clock = new THREE.Clock();
                var delta = clock.getDelta();
                data.animation = new TextureAnimator(maps.fx, 12, 12, 144, 60); // texture, #horiz, #vert, #total, duration.
                function TextureAnimator(texture, tilesHoriz, tilesVert, numTiles, tileDispDuration) {
                    // note: texture passed by reference, will be updated by the update function.
                    this.tilesHorizontal = tilesHoriz;
                    this.tilesVertical = tilesVert;
                    // how many images does this spritesheet contain?
                    //  usually equals tilesHoriz * tilesVert, but not necessarily,
                    //  if there at blank tiles at the bottom of the spritesheet.
                    this.numberOfTiles = numTiles;
                    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
                    texture.repeat.set(1 / this.tilesHorizontal, 1 / this.tilesVertical);
                    // how long should each image be displayed?
                    this.tileDisplayDuration = tileDispDuration;
                    // how long has the current image been displayed?
                    this.currentDisplayTime = 0;
                    // which image is currently being displayed?
                    this.currentTile = 0;
                    this.update = function () {
                        var delta = clock.getDelta();
                        this.currentDisplayTime += 1000 * delta;
                        while (this.currentDisplayTime > this.tileDisplayDuration) {
                            this.currentDisplayTime -= this.tileDisplayDuration;
                            this.currentTile++;
                            if (this.currentTile == this.numberOfTiles)
                                this.currentTile = 0;
                            var currentColumn = this.currentTile % this.tilesHorizontal;
                            texture.offset.x = currentColumn / this.tilesHorizontal;
                            var currentRow = Math.floor(this.currentTile / this.tilesHorizontal);
                            texture.offset.y = currentRow / this.tilesVertical;
                        }
                    };
                }
                var material = new THREE.MeshBasicMaterial({
                    map: maps.fx,
                    blending: THREE.AdditiveBlending,
                });
                var geometry = new THREE.PlaneGeometry(25, 25, 1, 1);
                return new THREE.Mesh(geometry, material);
            };
            return LogoFX;
        }());
        Elements.LogoFX = LogoFX;
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
                    logo: 'intro/new-assets/ren-tex.jpg'
                };
            };
            Ren.prototype.objs = function () {
                return {
                    logo: 'intro/models/ren.obj',
                };
            };
            Ren.prototype.create = function (maps, objs, data) {
                var logo = objs.logo, texture = maps.logo;
                logo.rotation.x = Math.PI * 2;
                logo.material = new THREE.MeshBasicMaterial({ map: texture });
                return logo;
            };
            return Ren;
        }());
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
                    rocks: 'intro/enter-page-assets/asteroid.png'
                };
            };
            Asteroid.prototype.create = function (maps, objs, data) {
                var geometry = new THREE.PlaneGeometry(512 / 1.5, 512 / 1.5, 1);
                var material = new THREE.MeshBasicMaterial({
                    side: THREE.DoubleSide,
                    map: maps.rocks,
                    transparent: true,
                    alphaTest: 0.1
                });
                return new THREE.Mesh(geometry, material);
            };
            return Asteroid;
        }());
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
                    galaxy: 'intro/galaxy.png',
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
        }());
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
                    galaxy: 'intro/universe-assets/overlay-1.png',
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
        }());
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
                    overlay: 'intro/universe-assets/overlay-2.png',
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
        }());
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
        }());
        Elements.Cube = Cube;
    })(Elements = DreamsArk.Elements || (DreamsArk.Elements = {}));
})(DreamsArk || (DreamsArk = {}));
var DreamsArk;
(function (DreamsArk) {
    var Elements;
    (function (Elements) {
        var For = DreamsArk.Helpers.For;
        var random = DreamsArk.Helpers.random;
        var SecondaryLogo = (function () {
            function SecondaryLogo() {
            }
            SecondaryLogo.prototype.maps = function () {
                return {
                    beam: 'intro/fxs/up-beam.png'
                };
            };
            SecondaryLogo.prototype.data = function () {
                return {
                    velocity: [],
                    speed: 0
                };
            };
            SecondaryLogo.prototype.create = function (maps, objs, data) {
                var browser = DreamsArk.module('Browser');
                var group = new THREE.Group(), texture = maps.beam;
                var clock = new THREE.Clock();
                data.animation = new TextureAnimator(maps.beam, 2, 4, 6, 60); // texture, #horiz, #vert, #total, duration.
                function TextureAnimator(texture, tilesHoriz, tilesVert, numTiles, tileDispDuration) {
                    this.tilesHorizontal = tilesHoriz;
                    this.tilesVertical = tilesVert;
                    this.numberOfTiles = numTiles;
                    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
                    texture.repeat.set(1 / this.tilesHorizontal, 1 / this.tilesVertical);
                    texture.offset.set(0 / this.tilesHorizontal, (tilesVert - 1) / this.tilesVertical);
                    this.tileDisplayDuration = tileDispDuration;
                    this.currentDisplayTime = 0;
                    this.currentTile = 0;
                    this.update = function () {
                        var delta = clock.getDelta();
                        this.currentDisplayTime += 1000 * delta;
                        while (this.currentDisplayTime > this.tileDisplayDuration) {
                            this.currentDisplayTime -= this.tileDisplayDuration;
                            this.currentTile++;
                            if (this.currentTile == this.numberOfTiles)
                                this.currentTile = 0;
                            var currentColumn = this.currentTile % this.tilesHorizontal;
                            texture.offset.x = currentColumn / this.tilesHorizontal;
                            var currentRow = Math.abs(Math.floor(this.currentTile / this.tilesHorizontal) - (this.tilesHorizontal - 1));
                            texture.offset.y = currentRow / this.tilesVertical;
                        }
                    };
                }
                var geometry = new THREE.PlaneGeometry(11 / 8, 128 / 3, 1), material = new THREE.MeshBasicMaterial({
                    map: texture,
                    transparent: true,
                    side: THREE.DoubleSide,
                    alphaTest: 0.1,
                    blending: THREE.AdditiveBlending
                }), beam = data.beam = new THREE.Mesh(geometry.clone(), material);
                For(10, function (i) {
                    var container = new THREE.Group(), logo = DreamsArk.elementsBag.Logo.clone(), vector = new THREE.Vector3(), fx = beam.clone();
                    vector.setX(random.between(-100, 100));
                    vector.setY(random.between(0, 20));
                    vector.setZ(random.between(-10, -199));
                    logo.position.copy(vector);
                    logo.position.y += 10;
                    fx.position.copy(vector);
                    container.add(logo);
                    container.add(fx);
                    //var scale = random.between(10, 50) * 0.01;
                    //gro.scale.set(scale, scale, scale);
                    group.add(container);
                    data.velocity.push(random.between(10, 50) * 0.01);
                });
                return group;
            };
            return SecondaryLogo;
        }());
        Elements.SecondaryLogo = SecondaryLogo;
    })(Elements = DreamsArk.Elements || (DreamsArk.Elements = {}));
})(DreamsArk || (DreamsArk = {}));
var DreamsArk;
(function (DreamsArk) {
    var Modules;
    (function (Modules) {
        /**
         * Collect and manage important data referent to the user browser data, OS.
         */
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
        }());
        Modules.Browser = Browser;
    })(Modules = DreamsArk.Modules || (DreamsArk.Modules = {}));
})(DreamsArk || (DreamsArk = {}));
var DreamsArk;
(function (DreamsArk) {
    var Modules;
    (function (Modules) {
        /**
         * Detect events on THREE.Object3D
         */
        var Raycaster = (function () {
            function Raycaster() {
                this.instance = new THREE.Raycaster();
            }
            Raycaster.prototype.configure = function () {
            };
            return Raycaster;
        }());
        Modules.Raycaster = Raycaster;
    })(Modules = DreamsArk.Modules || (DreamsArk.Modules = {}));
})(DreamsArk || (DreamsArk = {}));
var DreamsArk;
(function (DreamsArk) {
    var Modules;
    (function (Modules) {
        var length = DreamsArk.Helpers.length;
        var each = DreamsArk.Helpers.each;
        var reverse = DreamsArk.Helpers.reverse;
        /**
         * Handles any events that must to be updated every frame.
         */
        var Checker = (function () {
            function Checker() {
                this.collection = [];
            }
            /**
             * Add Event to collection
             */
            Checker.prototype.add = function (callback, context) {
                if (context === void 0) { context = DreamsArk; }
                this.collection.push({ callback: callback.bind(context), time: +new Date() });
            };
            /**
             * Check on every update against its collection
             */
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
            /**
             * Remove Event from Collection
             */
            Checker.prototype.remove = function (items) {
                each(reverse(items), function (item) {
                    this.collection.splice(item, 1);
                }, this);
            };
            return Checker;
        }());
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
        /**
         * Handle a series of easing mathematical calculations to make smooth animations from point A to point B
         */
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
        }());
        Modules.Animator = Animator;
        /**
         * Heavy uses Animator to execute animations
         */
        var Tween = (function () {
            /**
             * Initialize a new instance of Tween
             *
             * @param equation is one of animator's method
             * @param parameters is a series of configurations to be set
             * @param context context inside the (update, start, complete) callbacks
             */
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
            /**
             * Init the Tween
             */
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
        }());
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
        /**
         * Manager for Loader
         */
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
        }());
        Modules.Manager = Manager;
        /**
         * Handle dynamic load of any external asset
         */
        var Loader = (function () {
            function Loader() {
                /**
                 * Loading Progress
                 */
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
            /**
             * Start Loader
             */
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
            /**
             * load elements
             */
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
            /**
             * Load Public method
             */
            Loader.prototype.Load = function (items, callback, elements) {
                if (elements === void 0) { elements = DreamsArk.Elements; }
                this.start(filter(elements, items), callback);
            };
            return Loader;
        }());
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
        var each = DreamsArk.Helpers.each;
        /**
         * Track every interaction with mouse
         */
        var Mouse = (function () {
            function Mouse() {
                this.enabled = true;
                this.clicked = false;
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
                var clickCallback = function (event) {
                    this.clicked = true;
                };
                /**
                 * Manually Create Mouse Movement
                 */
                Events.add('window', 'click', clickCallback, this, false);
                /**
                 * Start Raycaster
                 */
                var checker = DreamsArk.module('Checker');
                checker.add(function () {
                    Events.update();
                    return false;
                });
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
        }());
        Modules.Mouse = Mouse;
        /**
         * Responsible to handle events
         */
        var Event = (function () {
            function Event(id, event, domElement, callback, useCapture) {
                this.id = id;
                this.event = event;
                this.domElement = domElement;
                this.callback = callback;
                this.useCapture = useCapture;
            }
            return Event;
        }());
        /**
         * Handle Interactions within mouse and 3D objects on the scene
         */
        var Raycaster = (function () {
            function Raycaster(id, event, element, callback) {
                this.id = id;
                this.event = event;
                this.element = element;
                this.callback = callback;
            }
            return Raycaster;
        }());
        /**
         * Append events to a collection where get checked on every update
         */
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
                /**
                 * if Element is an three obj then start raycaster instead
                 */
                if (element instanceof THREE.Object3D) {
                    this.collection.push(new Raycaster(random.id(), event, element, callback));
                    return;
                }
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
            Events.update = function () {
                var raycaster = DreamsArk.module('Raycaster'), mouse = DreamsArk.module('Mouse'), camera = DreamsArk.module('Camera');
                raycaster.setFromCamera(mouse.normalized, camera);
                each(this.collection, function (element) {
                    if (element instanceof Raycaster) {
                        /**
                         * Only Dispatches if it's an click event
                         */
                        if (element.event === 'click' && mouse.clicked === true) {
                            var intersects = raycaster.intersectObject(element.element);
                            if (intersects.length > 0)
                                element.callback();
                        }
                    }
                });
                /**
                 * Set mouse Clicked As False on every update but open doors to processing before it's set
                 */
                mouse.clicked = false;
            };
            Events.collection = [];
            return Events;
        }());
        Modules.Events = Events;
    })(Modules = DreamsArk.Modules || (DreamsArk.Modules = {}));
})(DreamsArk || (DreamsArk = {}));
var DreamsArk;
(function (DreamsArk) {
    var Modules;
    (function (Modules) {
        /**
         * Creates an instance of THREE.js Camera
         */
        var Camera = (function () {
            function Camera() {
                this.instance = new THREE.PerspectiveCamera();
            }
            /**
             * Configure camera's default values
             */
            Camera.prototype.configure = function () {
                var browser = DreamsArk.module('Browser');
                this.instance.fov = 75;
                this.instance.aspect = browser.innerWidth / browser.innerHeight;
                this.instance.near = 0.1;
                this.instance.far = 5000;
                this.instance.updateProjectionMatrix();
            };
            /**
             * Swing camera upon a target
             * @param target instance of THREE.Vector3
             */
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
        }());
        Modules.Camera = Camera;
    })(Modules = DreamsArk.Modules || (DreamsArk.Modules = {}));
})(DreamsArk || (DreamsArk = {}));
var DreamsArk;
(function (DreamsArk) {
    var Modules;
    (function (Modules) {
        /**
         * Creates an instance of THREE.js Scene
         */
        var Scene = (function () {
            function Scene() {
                this.instance = new THREE.Scene();
            }
            Scene.prototype.configure = function () {
                this.instance.fog = new THREE.Fog(0x19020d, 1, 1000);
            };
            return Scene;
        }());
        Modules.Scene = Scene;
    })(Modules = DreamsArk.Modules || (DreamsArk.Modules = {}));
})(DreamsArk || (DreamsArk = {}));
var DreamsArk;
(function (DreamsArk) {
    var Modules;
    (function (Modules) {
        /**
         * Creates an instance of THREE.js Renderer
         */
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
        }());
        Modules.Renderer = Renderer;
    })(Modules = DreamsArk.Modules || (DreamsArk.Modules = {}));
})(DreamsArk || (DreamsArk = {}));
var DreamsArk;
(function (DreamsArk) {
    var Compositions;
    (function (Compositions) {
        var each = DreamsArk.Helpers.each;
        var random = DreamsArk.Helpers.random;
        /**
         * Landing Page Composition
         */
        var Landing = (function () {
            function Landing() {
            }
            Landing.prototype.elements = function () {
                return ['Logo', 'EnterPage', 'SecondaryLogo', 'ChaosParticles'];
            };
            Landing.prototype.setup = function (scene, camera, elements) {
                var logo = elements.Logo, enterPage = elements.EnterPage, secondaryLogo = elements.SecondaryLogo, ChaosParticles = elements.ChaosParticles;
                enterPage.userData.start = function () {
                    new DreamsArk.Composition('Loading');
                };
                scene.add(logo, enterPage, secondaryLogo, ChaosParticles);
                camera.position.z = 30;
            };
            Landing.prototype.update = function (scene, camera, elements, elapsed) {
                var logo = elements.Logo, enterPage = elements.EnterPage, secondaryLogo = elements.SecondaryLogo, ChaosParticles = elements.ChaosParticles;
                enterPage.userData.parallex(logo);
                secondaryLogo.userData.animation.update(elapsed);
                ChaosParticles.userData.update();
                each(secondaryLogo.children, function (element, i) {
                    if (element.position.y >= 160)
                        element.position.set(random.between(-200, 200), -160, 0);
                    element.position.y += secondaryLogo.userData.velocity[i];
                });
            };
            return Landing;
        }());
        Compositions.Landing = Landing;
    })(Compositions = DreamsArk.Compositions || (DreamsArk.Compositions = {}));
})(DreamsArk || (DreamsArk = {}));
var DreamsArk;
(function (DreamsArk) {
    var Compositions;
    (function (Compositions) {
        var deg2rad = DreamsArk.Helpers.deg2rad;
        var timeout = DreamsArk.Helpers.timeout;
        var each = DreamsArk.Helpers.each;
        var random = DreamsArk.Helpers.random;
        /**
         * Loading Page Composition
         */
        var Loading = (function () {
            function Loading() {
            }
            Loading.prototype.elements = function () {
                return ['Particles', 'HexParticles', 'Asteroid', 'Ripple'];
            };
            Loading.prototype.setup = function (scene, camera, elements) {
                var animator = DreamsArk.module('Animator'), browser = DreamsArk.module('Browser'), mouse = DreamsArk.module('Mouse');
                var logo = elements.Logo, enterPage = elements.EnterPage, geometryHeight = enterPage.userData.layers.background.geometry.parameters.height, secondaryLogo = elements.SecondaryLogo, beam = secondaryLogo.userData.beam, hexParticles = elements.HexParticles, chaosParticles = elements.ChaosParticles, asteroid = elements.Asteroid, ripple = elements.Ripple;
                /**
                 * Speed Up to Light Speed
                 */
                var animLightSpeed = animator.expoOut({
                    destination: {
                        zoom: 0.3,
                        scale: new THREE.Vector3(4, 3, 1),
                        inner: 0.3
                    },
                    origin: {
                        zoom: 2,
                        scale: enterPage.userData.layers.tunnelBG.scale,
                        inner: hexParticles.userData.layers.inner.material.size
                    },
                    duration: 5,
                    delay: 2,
                    autoStart: false,
                    start: function () {
                        enterPage.remove(enterPage.userData.layers.galaxy);
                    },
                    update: function (params) {
                        camera.zoom = params.zoom;
                        camera.updateProjectionMatrix();
                        hexParticles.userData.layers.inner.material.size = params.inner;
                        enterPage.userData.layers.tunnelBG.scale.copy(params.scale);
                    }
                });
                /**
                 * Enter Tunnel
                 */
                var animEnterTunnel = animator.expoInOut({
                    destination: {
                        rotation: new THREE.Vector3(deg2rad(90), 0, deg2rad(360)),
                        position: new THREE.Vector3(0, 0, 0),
                        logo: new THREE.Vector3(0, 10, -2),
                        inner: new THREE.Vector3(0, 0, 0),
                        zoom: 2
                    },
                    origin: {
                        rotation: camera.rotation.toVector3(),
                        position: camera.position,
                        logo: logo.position,
                        inner: hexParticles.userData.layers.inner.position,
                        zoom: camera.zoom
                    },
                    duration: 5,
                    autoStart: false,
                    start: function () {
                        logo.userData.mouse.inverse = true;
                        /**
                         * Frog
                         */
                        enterPage.userData.layers.tunnelBG.userData.shader = {
                            runtime: null,
                            click: null,
                            init: function () {
                                //var runtime = this.runtime = new ShaderFrogRuntime();
                                //this.clock = new THREE.Clock();
                                //runtime.registerCamera(camera);
                                //runtime.load('shaders/universe.json', function (shaderData) {
                                //    enterPage.userData.layers.tunnelBG.material = runtime.get(shaderData.name);
                                //});
                            }
                        };
                        enterPage.userData.layers.tunnelBG.userData.shader.init();
                    },
                    update: function (params) {
                        camera.rotation.setFromVector3(params.rotation);
                        camera.position.copy(params.position);
                        camera.zoom = params.zoom;
                        camera.updateProjectionMatrix();
                        logo.position.copy(params.logo);
                        /**
                         * Enter Inner Particles
                         */
                        hexParticles.userData.layers.inner.position.copy(params.inner);
                        /**
                         * Enable movement on the way up
                         */
                        if (logo.userData.mouse.enabled === true) {
                            logo.position.z = params.logo.z + -mouse.screen.y * logo.userData.mouse.speed.z;
                        }
                    },
                    complete: function () {
                        animLightSpeed.init();
                        timeout(5, function () {
                            new DreamsArk.Composition('Universe');
                        });
                    }
                });
                var animAsteroid = animator.sineInOut({
                    destination: {
                        position: -geometryHeight * 2,
                        asteroid: new THREE.Vector3(-100, -250, -150)
                    },
                    origin: {
                        position: -geometryHeight,
                        asteroid: asteroid.position.set(-100, 230, -150)
                    },
                    duration: 10,
                    autoStart: false,
                    start: function () {
                        scene.add(asteroid);
                    },
                    update: function (params) {
                        enterPage.position.setY(params.position);
                        asteroid.position.copy(params.asteroid);
                    },
                    complete: function () {
                        animEnterTunnel.init();
                        scene.remove(asteroid);
                    }
                });
                /**
                 * Hide Inner particles and enter smoothly into transition
                 */
                hexParticles.position.setY(200);
                hexParticles.userData.layers.inner.position.setY(500);
                /**
                 * Start Throwing Things down
                 */
                animator.expoInOut({
                    destination: {
                        position: new THREE.Vector3(0, -geometryHeight, 0),
                        speed: 10,
                        hexParticles: new THREE.Vector3(0, 0, 0),
                        scale: new THREE.Vector3(3.5, 2.2, 1)
                    },
                    origin: {
                        position: enterPage.position,
                        speed: secondaryLogo.userData.speed,
                        hexParticles: hexParticles.position,
                        scale: beam.scale.set(1, 0.2, 1)
                    },
                    duration: 10,
                    start: function () {
                        beam.position.y -= 11;
                        ripple.position.copy(logo.position);
                        ripple.position.y -= 7;
                        logo.add(beam);
                        enterPage.add(ripple);
                        timeout(1, function () {
                            logo.userData.mouse.enabled = true;
                        });
                    },
                    update: function (params, progress, on) {
                        enterPage.position.copy(params.position);
                        secondaryLogo.userData.speed = params.speed;
                        chaosParticles.position.setY(params.position.y);
                        hexParticles.position.setY(params.hexParticles.y);
                        beam.scale.copy(params.scale);
                    },
                    complete: function () {
                        animAsteroid.init();
                        scene.remove(chaosParticles);
                    }
                });
                scene.add(hexParticles);
            };
            Loading.prototype.update = function (scene, camera, elements, elapsed) {
                var mouse = DreamsArk.module('Mouse');
                var logo = elements.Logo, enterPage = elements.EnterPage, secondaryLogo = elements.SecondaryLogo, hexParticles = elements.HexParticles, ripple = elements.Ripple;
                /**
                 * Frog
                 */
                // if (enterPage.userData.layers.tunnelBG.userData.shader)
                //     enterPage.userData.layers.tunnelBG.userData.shader.runtime.updateShaders(enterPage.userData.layers.tunnelBG.userData.shader.clock.getElapsedTime());
                secondaryLogo.userData.animation.update(elapsed);
                ripple.userData.animation.update(elapsed);
                hexParticles.userData.update();
                /**
                 * Anim Ships up
                 */
                each(secondaryLogo.children, function (element, i) {
                    if (element.position.y >= 160)
                        element.position.set(random.between(-200, 200), -160, 0);
                    element.position.y += secondaryLogo.userData.velocity[i] + secondaryLogo.userData.speed;
                });
                /**
                 * Logo Follow Mouse
                 */
                if (logo.userData.mouse.enabled === true && logo.userData.mouse.inverse === false) {
                    logo.position.x = mouse.screen.x * logo.userData.mouse.speed.x;
                    logo.position.y = -mouse.screen.y * logo.userData.mouse.speed.y + camera.position.y;
                }
                if (logo.userData.mouse.enabled === true && logo.userData.mouse.inverse === true) {
                    logo.position.x = mouse.screen.x * logo.userData.mouse.speed.x;
                    logo.position.z = -mouse.screen.y * logo.userData.mouse.speed.z;
                }
            };
            return Loading;
        }());
        Compositions.Loading = Loading;
    })(Compositions = DreamsArk.Compositions || (DreamsArk.Compositions = {}));
})(DreamsArk || (DreamsArk = {}));
var DreamsArk;
(function (DreamsArk) {
    var Compositions;
    (function (Compositions) {
        var For = DreamsArk.Helpers.For;
        /**
         * Universe Composition
         */
        var Universe = (function () {
            function Universe() {
            }
            Universe.prototype.elements = function () {
                return ['Plexus', 'Skybox'];
            };
            Universe.prototype.setup = function (scene, camera, elements) {
                var animator = DreamsArk.module('Animator'), renderer = DreamsArk.module('Renderer'), browser = DreamsArk.module('Browser');
                var logo = elements.Logo, plexus = elements.Plexus, hexParticles = elements.HexParticles, skybox = elements.Skybox, enterPage = elements.EnterPage, hexParticles = elements.HexParticles, secondaryLogo = elements.SecondaryLogo;
                skybox.userData.controls = new THREE.TrackballControls(camera, renderer.domElement);
                //skybox.userData.controls.dynamicDampingFactor = 0.1;
                skybox.userData.controls.minDistance = 10;
                skybox.userData.controls.maxDistance = 5000;
                skybox.userData.controls.target.set(0, browser.innerHeight, -1);
                //skybox.userData.controls.update();
                /**
                 * Center Camera
                 */
                //animator.circOut({
                //    destination: {
                //        position: new THREE.Vector3(0, 0, 50),
                //        rotation: new THREE.Vector3(0, 0, 0)
                //    },
                //    origin: {
                //        position: camera.position,
                //        rotation: camera.rotation.toVector3()
                //    },
                //    duration: 3,
                //    update: function (params) {
                //        //camera.position.copy(params.position);
                //        //camera.rotation.setFromVector3(params.rotation);
                //    }
                //});
                /**
                 * Speed up Logo
                 */
                animator.expoInOut({
                    destination: {
                        logo: new THREE.Vector3(0, 1000, 0),
                        hexParticles: new THREE.Vector3(0, -200, 0),
                        plexus: new THREE.Vector3(),
                        opacity: 0,
                        tunnelBG: new THREE.Vector3(0, 0, 0),
                        controls: new THREE.Vector3(),
                        maxDistance: 200,
                        far: 6000,
                        fog: 6500,
                        zoom: 1,
                        secondaryLogo: new THREE.Vector3(0, 1000, 0)
                    },
                    origin: {
                        logo: logo.position,
                        hexParticles: hexParticles.position,
                        plexus: plexus.position.set(0, 800, 0),
                        opacity: enterPage.userData.layers.tunnelBG.material.opacity,
                        tunnelBG: enterPage.userData.layers.tunnelBG.position,
                        controls: skybox.userData.controls.target,
                        maxDistance: skybox.userData.controls.maxDistance,
                        far: camera.far,
                        fog: scene.fog.far,
                        zoom: camera.zoom,
                        secondaryLogo: secondaryLogo.position,
                    },
                    duration: 10,
                    start: function () {
                        scene.add(plexus, skybox);
                    },
                    update: function (params) {
                        logo.position.copy(params.logo);
                        hexParticles.position.copy(params.hexParticles);
                        plexus.position.copy(params.plexus);
                        enterPage.userData.layers.tunnelBG.material.opacity = params.opacity;
                        enterPage.userData.layers.tunnelBG.position.copy(params.tunnelBG);
                        skybox.userData.controls.target.copy(params.controls);
                        skybox.userData.controls.maxDistance = params.maxDistance;
                        secondaryLogo.position.copy(params.secondaryLogo);
                        camera.far = params.far;
                        camera.zoom = params.zoom;
                        camera.updateProjectionMatrix();
                        scene.fog.far = params.fog;
                    },
                    complete: function () {
                        scene.remove(hexParticles, secondaryLogo, enterPage);
                    }
                });
                /**
                 * Go to Target
                 */
                //animator.expoIn({
                //    destination: {
                //        target: new THREE.Vector3(0, 0, 0)
                //    },
                //    origin: {
                //        target: skybox.userData.controls.target
                //    },
                //    duration: 2,
                //    update: function (params) {
                //        skybox.userData.controls.target.copy(params.target)
                //    }
                //});
                //scene.add(plexus);
            };
            Universe.prototype.update = function (scene, camera, elements) {
                var mouse = DreamsArk.module('Mouse');
                var logo = elements.Logo, hexParticles = elements.HexParticles, skybox = elements.Skybox;
                hexParticles.userData.update();
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
        }());
        Compositions.Universe = Universe;
    })(Compositions = DreamsArk.Compositions || (DreamsArk.Compositions = {}));
})(DreamsArk || (DreamsArk = {}));
/// <reference path="interfaces/Initializable.ts" />
/// <reference path="interfaces/Tweenable.ts" />
/// <reference path="interfaces/Loadable.ts" />
/// <reference path="interfaces/Composable.ts" />
/// <reference path="interfaces/Configurable.ts" />
/// <reference path="typings/three.d.ts" />
/// <reference path="typings/parallax.d.ts" />
/// <reference path="typings/three.OBJLoader.d.ts" />
/// <reference path="Helpers.ts" />
/// <reference path="elements/EnterPage.ts" />
/// <reference path="elements/ChaosParticles.ts" />
/// <reference path="elements/Ripple.ts" />
/// <reference path="elements/Tunnel.ts" />
/// <reference path="elements/Skybox.ts" />
/// <reference path="elements/Plexus.ts" />
/// <reference path="elements/Particles.ts" />
/// <reference path="elements/HexParticles.ts" />
/// <reference path="elements/Background.ts" />
/// <reference path="elements/Logo.ts" />
/// <reference path="elements/TunnelFX.ts" />
/// <reference path="elements/LogoFX.ts" />
/// <reference path="elements/Ren.ts" />
/// <reference path="elements/Asteroid.ts" />
/// <reference path="elements/Galaxy.ts" />
/// <reference path="elements/Overlay1.ts" />
/// <reference path="elements/Overlay2.ts" />
/// <reference path="elements/Cube.ts" />
/// <reference path="elements/SecondaryLogo.ts" />
/// <reference path="modules/Browser.ts" />
/// <reference path="modules/Raycaster.ts" />
/// <reference path="modules/Checker.ts" />
/// <reference path="modules/Animator.ts" />
/// <reference path="modules/Loader.ts" />
/// <reference path="modules/Mouse.ts" />
/// <reference path="modules/Camera.ts" />
/// <reference path="modules/Scene.ts" />
/// <reference path="modules/Renderer.ts" />
/// <reference path="compositions/Landing.ts" />
/// <reference path="compositions/Loading.ts" />
/// <reference path="compositions/Universe.ts" />
var DreamsArk;
(function (DreamsArk) {
    var is = DreamsArk.Helpers.is;
    var init = DreamsArk.Helpers.init;
    var Loader = DreamsArk.Modules.Loader;
    /**
     * Debug Mode
     */
    DreamsArk.debug = false;
    /**
     * Stores all elements that has been loaded on the application
     */
    DreamsArk.elementsBag = {};
    /**
     * Stores some trivial variables to be checked on render loop
     */
    DreamsArk.core = {
        /**
         * List of active objects
         * @todo inset components such as Camera, Scene, Renderer
         */
        active: {
            /**
             * Active Composition
             */
            composition: null
        }
    };
    /**
     * Defines the main application CORE
     */
    var App = (function () {
        /**
         * Initialize the main APP
         */
        function App() {
            var mouse = DreamsArk.module('Mouse');
            //
            // /**
            //  * start Loading the basic scene
            //  */
            DreamsArk.load();
            //
            // mouse.click('#start', function () {
            //
            //     start();
            //
            //     return true;
            //
            // });
            //
            // mouse.click('.skipper', function () {
            //
            //     query('form').submit();
            //
            //     return true;
            //
            // });
            //
            // mouse.click('#skip', function () {
            //
            //     query('form').submit();
            //
            //     return true;
            //
            // });
            //
            // mouse.click('.reseter', function () {
            //
            //     location.reload();
            //
            //     return true;
            //
            // });
        }
        return App;
    }());
    DreamsArk.App = App;
    /**
     * Start the Application
     */
    DreamsArk.start = function () {
        /**
         * Remove logo
         */
        //query('.container-fluid').classList.add('--fade-to-black');
        //query('.enter-page').classList.add('--exit');
        var composition = new Composition('Loading');
        DreamsArk.render();
    };
    /**
     * Start the Application
     */
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
    /**
     * Render Loop Logic
     * @param elapsedTime Time elapsed since the last call
     */
    DreamsArk.render = function (elapsedTime) {
        requestAnimationFrame(DreamsArk.render);
        var renderer = DreamsArk.module('Renderer'), scene = DreamsArk.module('Scene'), camera = DreamsArk.module('Camera'), checker = DreamsArk.module('Checker');
        if (!is.Null(DreamsArk.core.active.composition))
            if (DreamsArk.core.active.composition.update)
                DreamsArk.core.active.composition.update(scene, camera, DreamsArk.core.active.composition.elementsBag, elapsedTime);
        checker.update();
        renderer.render(scene, camera);
    };
    /**
     * Get Initializable and initialize it if is not initialized before
     * @param module - a module to be initialized
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
    /**
     * Get an element by it's name
     * @param name - name of the element to be retrieven
     * @returns {*}
     */
    DreamsArk.element = function (name) {
        if (is.Null(DreamsArk.elementsBag[name])) {
            console.log('Element ' + name + ' doesn\'t exist or it wasn\'t loaded.');
            return;
        }
        return DreamsArk.elementsBag[name];
    };
    /**
     * An Element composed of several components to compose a Scene
     */
    var Composition = (function () {
        /**
         * Initiate the process of starting a new composition
         * @param name - Composition name to be started
         */
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
    }());
    DreamsArk.Composition = Composition;
})(DreamsArk || (DreamsArk = {}));
/**
 * Start App
 */
new DreamsArk.App();
//document.querySelector('body').style.backgroundColor: #000;
var DreamsArk;
(function (DreamsArk) {
    var Compositions;
    (function (Compositions) {
        var For = DreamsArk.Helpers.For;
        var deg2rad = DreamsArk.Helpers.deg2rad;
        var query = DreamsArk.Helpers.query;
        var LoadingTest = (function () {
            function LoadingTest() {
            }
            LoadingTest.prototype.elements = function () {
                return ['Particles', 'Tunnel', 'TunnelFX', 'Skybox', 'Asteroid'];
            };
            LoadingTest.prototype.setup = function (scene, camera, elements) {
                var animator = DreamsArk.module('Animator'), mouse = DreamsArk.module('Mouse');
                var logo = elements.Logo, ren = elements.Ren, asteroid = elements.Asteroid, particles = elements.Particles, tunnel = elements.Tunnel, tunnelFx = elements.TunnelFX, skybox = elements.Skybox, domBackground = query('.enter-page'), domTransistor = query('#transistor'), domLogo = query('#logo'), domControls = query('#reset-controls');
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
                        domControls.style.display = 'block';
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
                        scene.add(tunnelFx);
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
            LoadingTest.prototype.update = function (scene, camera, elements) {
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
                var tunnel = elements.Tunnel, tunnelFx = elements.TunnelFX;
                if (tunnel.userData.timer !== null)
                    tunnel.userData.update();
                tunnelFx.userData.update();
                /**
                 * Controls
                 */
                var skybox = elements.Skybox;
                if (skybox.userData.controls)
                    skybox.userData.controls.update();
            };
            return LoadingTest;
        }());
        Compositions.LoadingTest = LoadingTest;
    })(Compositions = DreamsArk.Compositions || (DreamsArk.Compositions = {}));
})(DreamsArk || (DreamsArk = {}));
var DreamsArk;
(function (DreamsArk) {
    var Compositions;
    (function (Compositions) {
        var For = DreamsArk.Helpers.For;
        var UniverseOld = (function () {
            function UniverseOld() {
            }
            UniverseOld.prototype.elements = function () {
                return ['Plexus'];
            };
            UniverseOld.prototype.setup = function (scene, camera, elements) {
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
            UniverseOld.prototype.update = function (scene, camera, elements) {
                var skybox = elements.Skybox;
                /**
                 * Controls
                 */
                if (skybox.userData.controls)
                    skybox.userData.controls.update();
                var hex = elements.Plexus.userData.hex, hexBag = elements.Plexus.userData.hexBag, hexPositions = hex.geometry.attributes.position, distance = 100, speed = 10;
                var tunnelFx = elements.TunnelFX;
                tunnelFx.userData.update();
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
            return UniverseOld;
        }());
        Compositions.UniverseOld = UniverseOld;
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
                    planet: 'intro/transition-assets/planet.png'
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
        }());
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
                    core: 'intro/hex-assets/hexicle.png',
                    point_squad: 'intro/point-squad.png',
                    hexicle: 'intro/hex-assets/hexicle.png',
                    point_1_1: 'intro/hex-assets/point-1.png',
                    point_1_2: 'intro/hex-assets/point-2.png',
                    point_1_3: 'intro/hex-assets/point-3.png',
                    point_1_4: 'intro/hex-assets/point-4.png',
                    point_1_5: 'intro/hex-assets/point-5.png',
                    point_2_1: 'intro/hex-assets/point-4.png',
                    point_2_2: 'intro/hex-assets/point-3.png',
                    point_2_3: 'intro/hex-assets/point-2.png',
                    point_2_4: 'intro/hex-assets/point-1.png',
                    point_2_5: 'intro/hex-assets/point-5.png',
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
        }());
        Elements.Plexus2 = Plexus2;
    })(Elements = DreamsArk.Elements || (DreamsArk.Elements = {}));
})(DreamsArk || (DreamsArk = {}));
