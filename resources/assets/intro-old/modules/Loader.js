module.exports = (function (e) {

    return e.loader = {

        /**
         * public property
         */
        progress: null,
        complete: false,
        count: 0,

        on: {start: null, progress: null, load: null, error: null},

        /**
         * Initializable
         */
        loader: null,
        objLoader: null,

        init: function () {

            var manager = e.module('manager', this.on);

            /**
             * Init Loader
             * @type {THREE.TextureLoader}
             */
            this.loader = new THREE.TextureLoader(manager);

            /**
             * Init OBJ Loader
             * @type {THREE.OBJLoader}
             */
            this.objLoader = new THREE.OBJLoader(manager);

        },

        /**
         * Load All Global Elements
         * @param elements
         */
        load: function (elements) {

            /**
             * if is an array of single objects, load recursively them all
             */
            if (e.helpers.isArray(elements)) {

                e.helpers.keys(elements, function (el) {
                    this.load(el);
                }, this);

                return;

            }

            /**
             * if an element is sent directly then initialize it
             */
            if (e.helpers.isFunction(elements.create)) {

                var name    = e.helpers.captalize(elements.name),
                    element = {};

                element[name] = elements;

                /**
                 * send again but this time send as an object with no create method
                 */
                this.load(element);

                return;

            }

            /**
             * only pass if it`s object and doesn't have create method so i assume it is an object of objects
             */
            e.helpers.keys(elements, function (el) {

                this.complete = false;
                this.count++;

                /**
                 * Empty ElementsBag
                 * @type {{el: *, userData: {}, maps: {}, objs: {}}}
                 */
                var elementsBag = {el: el, userData: {}, maps: {}, objs: {}};

                var length = 0;
                var loaded = 0;

                /**
                 * Executes on each onLoad event
                 *
                 * @param type
                 * @param name
                 * @param obj
                 */
                var ready = function (type, name, obj) {

                    /**
                     * fix for getting the object directly, not a Object3D
                     */
                    if (obj instanceof THREE.Object3D)
                        obj = obj.children[0];

                    elementsBag[type][name] = obj;

                    /**
                     * Check if everything has finished
                     */
                    if (loaded++ == length - 1) {

                        this.create(elementsBag);

                        if (this.count-- == 1)
                            this.complete = true;

                    }

                };

                /**
                 * If the Object doesn't have create method means
                 * 1 - the object was already created so skip it
                 * 2 - the create function is missing so there is no way
                 * to create it
                 */
                if (!e.helpers.isFunction(el.create))
                    return;

                /**
                 * Check if object has shared properties
                 */
                if (e.helpers.isFunction(el.share))
                    elementsBag.userData = el.share();

                /**
                 * if Maps is set then initialize it
                 */
                if (e.helpers.isFunction(el.maps)) {

                    var maps = el.maps();

                    /**
                     * Defines how many items it should wait to complete
                     */
                    length += e.helpers.length(maps);

                    e.helpers.keys(maps, function (path, name) {
                        this.loader.load(path, ready.bind(this, 'maps', name));
                    }, this);

                }

                /**
                 * if Objs is set then initialize it
                 */
                if (e.helpers.isFunction(el.objs)) {

                    var objs = el.objs();

                    length += e.helpers.length(objs);

                    e.helpers.keys(objs, function (path, name) {
                        this.objLoader.load(path, ready.bind(this, 'objs', name));
                    }, this);

                }

                /**
                 * if there is no Objs or Maps just create it straight away then
                 */
                if (!e.helpers.isFunction(el.objs) && !e.helpers.isFunction(el.maps))
                    this.create(elementsBag);

            }, this);
        },

        create: function (elementsBag) {

            var element     = elementsBag.el.create(e, elementsBag.userData, elementsBag.maps, elementsBag.objs),
                elementName = e.helpers.captalize(elementsBag.el.name);

            /**
             * Default behaviors
             */
            element.name = elementName;
            element.userData = e.helpers.extend(elementsBag.userData, element.userData);

            /**
             * Append to the global Elements
             * @type {Engine}
             */
            e.elements[elementName] = element;

        },

        reset: function () {

            this.progress = null;
            this.complete = false;
            this.count    = 0;
            this.on       = {start: null, progress: null, load: null, error: null};

        }

    };

})(Engine);