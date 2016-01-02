module DreamsArk.Modules {

    import each = DreamsArk.Helpers.each;
    import is = DreamsArk.Helpers.is;
    import filter = DreamsArk.Helpers.filter;

    export class Manager implements Initializable {

        public instance:any;
        public on:{start:any, progress:any, load:any, error:any} = {
            start: null,
            progress: null,
            load: null,
            error: null
        };

        constructor() {
            this.instance = new THREE.LoadingManager();
        }

        configure():void {

            var on = this.on;

            this.instance.onStart = function (item, loaded, total) {

                if (is.Function(on.start))
                    on.start(item, loaded, total);
            };

            this.instance.onProgress = function (item, loaded, total) {

                var loader = module('Loader');

                var progress = loader.progress = (loaded * 100) / total;

                if (is.Function(on.progress))
                    on.progress(Math.round(progress), item, loaded, total);
            };

            this.instance.onLoad = function () {

                var loader = module('Loader');

                loader.complete = true;

                if (is.Function(on.load))
                    on.load();

            };

            this.instance.onError = function (item) {

                var loader = module('Loader');

                console.log('item: ' + item + " not loaded");

                loader.failed = true;

                if (is.Function(on.error))
                    on.error(item);
            };

        }

    }

    export class Loader implements Initializable {

        public progress:number = 0;
        public complete:boolean = false;
        public failed:boolean = false;
        private count:number = 0;

        public objLoader;
        public textureLoader;

        constructor() {

            var manager = module('Manager');

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

        configure():void {
        }

        private start(elements:any = Elements, callback:any):void {

            var maps = {},
                objs = {};

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

                        var instance = new el(),
                            userData = is.Function(instance.data) ? instance.data() : {},
                            temp = {};

                        temp[name] = instance.create(maps[name], objs[name], userData);
                        temp[name].name = name;
                        temp[name].userData = userData;

                        /**
                         * Override Global Elements Bag
                         */
                        elementsBag[name] = temp[name];

                    });

                    this.complete = true;

                    callback(elementsBag)

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


        }

        private load(items:any[], callback) {

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

        }

        public Load(items:string[], callback, elements:any = Elements) {
            this.start(filter(elements, items), callback);
        }

    }

}

