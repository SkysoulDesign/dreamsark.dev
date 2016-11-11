///<reference path="../compositions/Loading.ts"/>
var DreamsArk;
(function (DreamsArk) {
    var Modules;
    (function (Modules) {
        var is = DreamsArk.Helpers.is;
        var Manager = (function () {
            function Manager() {
                this.on = load;
            }
            return Manager;
        })();
        Modules.Manager = Manager;
        {
            start: null, progress;
            null, load;
            null, error;
            null;
        }
        ;
        constructor();
        {
            this.instance = new THREE.LoadingManager();
        }
        configure();
        void {
            var: on = this.on,
            this: .instance.onStart = function (item, loaded, total) {
                if (is.Function(on.start))
                    on.start(item, loaded, total);
            },
            this: .instance.onProgress = function (item, loaded, total) {
                var loader = module('Loader');
                var progress = loader.progress = (loaded * 100) / total;
                if (is.Function(on.progress))
                    on.progress(Math.round(progress), item, loaded, total);
            },
            this: .instance.onLoad = function () {
                var loader = module('Loader');
                loader.complete = true;
                if (is.Function(on.load))
                    on.load();
            },
            this: .instance.onError = function (item) {
                console.log('item: ' + item + " not loaded");
                if (is.Function(on.error))
                    on.error(item);
            }
        };
    })(Modules = DreamsArk.Modules || (DreamsArk.Modules = {}));
})(DreamsArk || (DreamsArk = {}));
var Loader = (function () {
    function Loader() {
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
    Loader.prototype.configure = function () {
    };
    Loader.prototype.start = function () {
        var comps = Compositions;
        each(comps, function (element, name) {
            var composition = new element, maps = [];
            if (is.Function(composition.maps))
                maps = this.load(composition.maps());
        }, this);
    };
    Loader.prototype.load = function (items) {
        each(items, function (path) {
            if (is.Image(path))
                this.textureLoader.load(path);
        }, this);
    };
    return Loader;
})();
exports.Loader = Loader;
//# sourceMappingURL=Loader.js.map