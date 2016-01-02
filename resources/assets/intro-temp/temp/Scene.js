module.exports = function (e) {

    /**
     * Append Scene to Engine
     */
    return e.scene = {

        /**
         * Active
         */
        a: null,

        init: function (configs, autoSet) {

            /**
             * Auto Set the Scene as Active
             * @type {*|boolean}
             */
            autoSet = autoSet || true;
            configs = configs ? configs : e.c.scene;

            /**
             * Scene
             * @type {THREE.Scene}
             */
            var scene = new THREE.Scene();

            Object.keys(c.scene).map(function (key) {
                scene[key] = configs[key];
            });

            if (autoSet)
                this.a = scene;

            return scene;

        },

        new: function (configs) {
            return this.init(configs, false);
        },

        set: function (scene) {
            this.a = scene;
        }

    };

};