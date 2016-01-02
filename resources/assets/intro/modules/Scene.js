module.exports = (function (e) {

    /**
     * Append Scene to Engine
     */
    return e.scene = {

        /**
         * Active
         */
        scene: null,

        init: function () {

            var configs = {
                fog: new THREE.FogExp2( 0x000000, 0.00000025 )
            };

            /**
             * Scene
             * @type {THREE.Scene}
             */
            var scene = new THREE.Scene();

            e.helpers.keys(configs, function (el, name) {
                scene[name] = el;
            });

            this.scene = scene;

        }

    };

})(Engine);