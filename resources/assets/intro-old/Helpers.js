module.exports = (function () {

    return {

        init: function () {

            for (var i = 0; i < arguments.length; i++) {

                /**
                 * if no arguments, break it
                 */
                if (this.isNull(arguments[i]))
                    return;

                /**
                 * Recursively Init All
                 */
                if (!this.isFunction(arguments[i].init)) {

                    this.keys(arguments[i], function (el) {
                        this.init(el);
                    });

                    return;

                }

                /**
                 * Init if it has Init set
                 */
                if (this.isFunction(arguments[i].init))
                    arguments[i].init();

                /**
                 * Configure if necessary
                 */
                if (this.isFunction(arguments[i].configure))
                    arguments[i].configure(arguments[i].instance);

            }

        },

        isObject: function (item) {
            return (typeof item === "object" && !Array.isArray(item) && item !== null);
        },

        isFunction: function (item) {
            return !!(item && item.constructor && item.call && item.apply);
        },

        isArray: function (item) {
            return Array.isArray(item);
        },

        isNull: function (item) {
            return (item === null || item === undefined || item === 0 || item === '0');
        },

        keys: function (elements, callback, context) {

            if (this.isArray(elements))
                elements.forEach(callback.bind(context || Engine));

            if (this.isObject(elements))
                Object.keys(elements).forEach(function (name) {
                    callback.call(context || Engine, elements[name], name);
                });
        },

        map: function (obj, callback, context) {

            var instance = {};

            /**
             * Loop on every property and set them accordingly
             */
            this.keys(obj, function (el, index) {

                /**
                 * if it's an object, map again
                 */
                if (this.isObject(el)) {

                    return instance[index] = this.map(el, callback, context);

                } else {

                    /**
                     * call Callback
                     */
                    instance[index] = callback.call(context || Engine, el, index);

                }

            }, this);

            return instance;

        },

        for: function (max, callback, context, reverse) {

            /**
             * Play for on Reverse
             */
            if (reverse === true) {

                for (var i = max - 1; i >= 0; i--)
                    callback.call(context || Engine, i);

                return;

            }

            for (var i = 0; i < max; i++)
                callback.call(context || Engine, i);
        },

        for2: function (max, startAt, callback, context) {
            for (var i = startAt || 0; i < max + startAt; i++)
                callback.call(context || Engine, i, i - startAt);
        },

        in: function (element, array) {

            return (array.indexOf(element) > -1);
        },

        clone: function (obj, skip) {

            if (!this.isObject(obj))
                return obj;

            var temp = {};

            this.keys(obj, function (el, key) {

                /**
                 * Skip Properties if it has been set
                 */
                if (!this.isNull(skip) && this.in(key, skip))
                    return;

                temp[key] = this.clone(obj[key], skip);

            }, this);

            return temp;

        },

        every: function (array, callback, context) {
            return array.every(callback.bind(context || Engine));
        },

        timeout: function (time, callback, context) {
            return window.setTimeout(callback.bind(context || Engine), time * 1000);
        },

        extend: function (obj, src) {

            this.keys(src, function (el, name) {
                obj[name] = el;
            });

            return obj;
        },

        set: function (object, closure) {
            closure.call(object, closure);
        },

        appendTo: function (element, domElement) {
            document.querySelector(element).appendChild(domElement);
        },

        captalize: function (string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        },

        sort: function (array) {
            return array.sort(function (a, b) {
                return b - a
            });
        },

        length: function (item) {

            if (this.isArray(item))
                return item.length;

            if (this.isObject(item)) {

                var length = 0;

                this.keys(item, function () {
                    length++
                });

                return length;

            }

        },

        sub: function (origin, obj) {
            return this.math(origin, obj, '-')
        },

        add: function (origin, obj) {
            return this.math(origin, obj, '+')
        },

        multiply: function (origin, obj) {
            return this.math(origin, obj, '*')
        },

        divide: function (origin, obj) {
            return this.math(origin, obj, '/')
        },

        math: function (origin, obj, operator) {

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

            if (this.isObject(origin)) {

                this.keys(origin, function (el, index) {

                    if (this.isObject(el)) {
                        return temp[index] = this.math(el, this.isObject(obj) ? obj[index] : obj, operator);
                    }

                    if (this.isObject(obj)) {

                        if (this.isObject(obj[index]))
                            return temp[index] = this.math(el, obj[index], operator);

                        return temp[index] = operators[operator](el, obj[index]);

                    }

                    temp[index] = operators[operator](el, obj)

                }, this);

                return temp;

            }

            return operators[operator](origin, obj);

        },

        group: function () {

            var group = new THREE.Group();

            for (var i = 0; i < arguments.length; i++) {
                group.add(arguments[i]);
            }

            return group;

        },

        random: function (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },

        random3: function (x, y, z, distance, stick) {

            var options = {
                x: x || 0,
                y: y || false,
                z: z || false,
                distance: distance || false,
                stick: stick || false
            };

            // Coordinates
            var u1     = Math.random() * 2 - 1,
                u2     = Math.random(),
                radius = Math.sqrt(1 - u1 * u1),
                theta  = 2 * Math.PI * u2;

            // Stick to surface or disperse inside sphere
            if (!options.stick)
                options.distance = Math.random() * options.distance;

            return new THREE.Vector3(
                radius * Math.cos(theta) * options.distance + options.x,
                radius * Math.sin(theta) * options.distance + options.y,
                u1 * options.distance + options.z
            );

        }

    }

})();