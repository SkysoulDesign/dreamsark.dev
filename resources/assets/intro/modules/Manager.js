module.exports = (function (e) {

    return e.manager = {

        manager: null,

        /**
         * init Manager
         * on {start, progress, load, error}
         * @param on
         */
        init: function (on) {

            /**
             * Append Renderer to Engine
             * @type {THREE.LoadingManager}
             */
            var manager = new THREE.LoadingManager();

            manager.onStart = function (item, loaded, total) {
                if (e.helpers.isFunction(on.start))
                    on.start.call(this, item, loaded, total);
            };

            manager.onProgress = function (item, loaded, total) {

                var progress = e.loader.progress = (loaded * 100) / total;

                if (e.helpers.isFunction(on.progress))
                    on.progress.call(this, Math.round(progress), item, loaded, total);
            };

            manager.onLoad = function () {

                e.loader.complete = true;
                if (e.helpers.isFunction(on.load))
                    on.load.call(this);

            };

            manager.onError = function (item) {
                console.log('item: ' + item + " not loaded");
                if (e.helpers.isFunction(on.error))
                    on.error.call(this, item);
            };

            this.manager = manager;
        }
    };

})(Engine);