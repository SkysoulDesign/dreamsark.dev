module.exports = (function (e) {

    return e.compositor = {

        /**
         * public property
         */
        compositions: null,
        active: null,
        index: 0,

        /**
         * Initializable
         */
        compositor: null,

        init: function () {

            this.compositions = require('./../Compositions');
            this.order        = e.configs.compositions;
            this.compositor   = this;

            /**
             * Setup right after init so it will start the loading composition as default
             */
            this.setup();

        },

        setup: function (composition) {

            /**
             * Set the first composition if none is set
             */
            if (e.helpers.isNull(composition)) {
                return this.setup(this.compositions[this.order[this.index++]]);
            }

            /**
             * Only for the first time it will be initialized and have the load property
             * treated as manually load ideally for loading page
             */
            if (e.helpers.isFunction(composition)) {

                /**
                 * Initialize comp
                 */
                var comp   = this.initiate(composition),
                    loader = e.module('loader').class;

                /**
                 * Load comp dependencies
                 */
                if (e.helpers.isArray(comp.load))
                    loader.load(comp.load);

                return this.setup(comp);

            }

            /**
             * Loop on update until loader is complete then init the composition
             */
            e.checker.add(function () {

                var loader = e.module('loader').class;

                if (e.helpers.isObject(composition) && loader.complete) {

                    this.active = composition;
                    this.active.setup();

                    return true;

                }

                return false;

            }, this)

        },

        update: function () {

            if (!e.helpers.isNull(this.active) && e.helpers.isFunction(this.active.animation)) {
                this.active.animation();
            }

        },

        initiate: function (composition) {

            /**
             * Only functions can be initialized
             */
            if (!e.helpers.isFunction(composition)) return;

            var scene    = e.module('scene'),
                camera   = e.module('camera'),
                elements = e.elements;

            return composition(e, scene, camera, elements);

        },

        next: function () {
            this.setup();
        }

    };

})(Engine);