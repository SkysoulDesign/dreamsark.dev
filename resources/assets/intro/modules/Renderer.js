module.exports = (function (e) {

    return e.renderer = {

        renderer: null,

        init: function () {

            var config = {
                antialias: true,
                alpha: true
            };

            /**
             * Renderer
             * @type {THREE.PerspectiveCamera}
             */
            this.renderer = new THREE.WebGLRenderer(config);

        },

        /**
         * Configure Renderer
         */
        configure: function (configs, context) {

            var domElement = this.domElement;

            domElement.style.position = 'absolute';
            domElement.style.zIndex = 5;

            e.helpers.appendTo(configs.container, this.domElement);

            /**
             * Get Global Browser settings
             */
            var browser = e.module('browser');

            //this.setClearColor(scene.a.fog.color);
            this.setPixelRatio(browser.devicePixelRatio);
            this.setSize(browser.innerWidth, browser.innerHeight);

        }

    };

})(Engine);