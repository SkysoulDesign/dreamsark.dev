module.exports = (function () {

    return {

        /**
         * Helpers
         */
        helpers: require('./Helpers'),
        configs: require('./Configs'),
        plugins: require('./Plugins'),
        fonts: require('./Fonts'),

        /**
         * Public Property
         */

        /**
         * Initializable
         */
        loader: null,
        manager: null,
        elements: null,
        compositor: null,
        renderer: null,
        scene: null,
        camera: null,
        mouse: null,
        checker: null,
        events: null,
        stats: null,

        init: function () {

            var helpers = this.helpers;

            /**
             * Init Initializable
             */
            require('./Modules');
            require('./Elements');

            helpers.init(
                this.loader,
                this.compositor
            );

            /**
             * Start Rendering
             */
            this.render();

            return this;

        },

        start: function (callback, context) {

            callback.call(context || this, this.loader.on);

            //this.loader.reset();

            //this.loader.on.start = function () {
            //    //document.querySelector('.body').style.display = 'block';
            //};
            //
            //this.loader.on.progress = function (item, loaded, total, progress) {
            //    console.log(item, loaded, total, progress);;
            //};
            //
            //this.loader.on.load = function () {
            //
            //    console.log('everything finished loading');
            //    //var scene    = e.module('scene'),
            //    //    elements = e.module('elements');
            //
            //    //scene.add(elements.Dreamsark);
            //
            //};
            //
            //this.loader.on.error = function () {
            //
            //};

            /**
             * Init Initializable
             */
            this.loader.load(this.elements);

            /**
             * Init After Click
             */
            //this.helpers.init(
            //
            //);


        },

        /**
         * Get Initializable and initialize it if is not initialized before
         * @param module
         * @param params
         * @returns {*}
         */
        module: function (module, params) {

            /**
             * if Module is not initialized then init it
             */
            if (this.helpers.isNull(this[module][module])) {

                this[module].init.call(this[module], params);

                /**
                 * Configure if is function
                 */
                if (this.helpers.isFunction(this[module].configure))
                    this[module].configure.call(this[module][module], this.configs[module], this[module]);

            }

            /**
             * Link Parent to it's children
             * @type {*}
             */
            this[module][module].class = this[module];

            return this[module][module];

        },

        render: function (time) {

            /**
             * Init Initializable on Render Time
             */
            var renderer   = this.module('renderer'),
                scene      = this.module('scene'),
                camera     = this.module('camera'),
                compositor = this.module('compositor'),
                checker    = this.module('checker'),
                stats      = this.module('stats');

            var render = {
                render: function () {

                    requestAnimationFrame(render.render);

                    /**
                     * Update compositor
                     */
                    compositor.update();

                    /**
                     * Update Checker
                     */
                    checker.update();

                    /**
                     * Stats
                     */
                    stats.update();

                    renderer.render(scene, camera);

                }
            };

            render.render();

        }

    }

})();