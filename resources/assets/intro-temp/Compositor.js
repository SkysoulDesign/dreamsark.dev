module.exports = (function (e) {

    return e.compositor = {

        /**
         * Active Composition
         */
        active: null,

        /**
         * Composition Counter
         */
        comp: 0,
        GUIData: {
            dat: new dat.GUI,
            controller: null,
            data: {},
            add: function (obj, name) {
                this.data[name] = this.controller[name] = obj;
            }
        },
        public: {},

        construct: function () {

            var object = this.active.constructor(e.elements);

            /**
             * Get Only those which has shared property
             */
            var shared = {};
            Object.keys(e.elements).forEach(function (name) {

                if (e.elements[name].public instanceof Object) {
                    shared = e.helpers.extend(shared, e.elements[name].public);
                }

            });

            /**
             * Merge Shared From Composition and from Elements
             */
            var final    = e.helpers.extend(object, shared),
                extended = e.helpers.extend(this.public, final);

        },

        init: function (extraData) {

            var compName = Object.keys(e.compositions)[this.comp];

            /**
             * Load Assets
             */
            e.loader.compositionLoader(compName);

            this.active = e.compositions[compName];

            /**
             * Set All Public Variables which will be shared across all functions
             */
            this.construct();

            this.active.setup(this.public, e.elements, extraData);

            /**
             * Init GUI
             */
            this.GUI();

            /**
             * Check if Raycaster is set
             */
            if (typeof this.active.raycaster === 'function') {
                e.raycaster.init();
                this.active.raycaster.call(e.raycaster, this.public, e.elements);
            }

        },

        animate: function () {

            /**
             * Check if Animation is set
             */
            if (typeof this.active.animation === 'function') {
                this.active.animation(this.public, e.elements);
            }

        },

        GUI: function () {

            /**
             * Only Initialize GUI if it`s set
             */
            if (!this.active.GUI instanceof Object || this.active.GUI === undefined) {
                return;
            }

            var controller = this.GUIData.controller = this.active.GUI.controller(this.public);
            this.active.GUI.gui(controller, this.public, this.GUIData.dat);

        },

        next: function (extraData) {
            this.comp++;
            this.init(extraData);
        },

        previous: function () {
            this.comp--;
            this.init();
        }

    }

})(Engine);