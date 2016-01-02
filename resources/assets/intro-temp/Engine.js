module.exports = function () {

    return {

        /**
         * Public Property
         */
        modules: null,

        /**
         * Classes
         */

        init: function () {

            /**
             * Init Initializable
             */
            this.modules = require('./Modules');

        },

        start: function () {

            /**
             * Init Initializable
             */
            this.modules.Loader.init();
        }

    };

    /**
     * Init Core
     */
    //var helpers      = require('./Helpers'),
    //    manager      = require('./modules/Manager'),
    //    elements     = require('./Elements'),
    //    compositions = require('./Compositions'),
    //    compositor   = require('./Compositor'),
    //    camera       = require('./modules/Camera'),
    //    scene        = require('./modules/Scene'),
    //    renderer     = require('./modules/Renderer'),
    //    plugins      = require('./Plugins'),
    //    loader       = require('./modules/Loader'),
    //    shaders      = require('./Shaders'),
    //    passer       = require('./Passer'),
    //    composer     = require('./Composer'),
    //    events       = require('./Events'),
    //    tween        = require('./Tween'),
    //    raycaster    = require('./modules/Raycaster');

    /**
     * Init Stuff
     */
    //helpers.init(loader, scene, camera, compositor, plugins.Stats, composer);
    //
    ///**
    // * Set Renderer Sizes
    // */
    //helpers.set(renderer, function () {
    //    //this.setClearColor(scene.a.fog.color);
    //    this.setPixelRatio(window.devicePixelRatio);
    //    this.setSize(window.innerWidth, window.innerHeight);
    //    this.gammaInput  = true;
    //    this.gammaOutput = true;
    //});
    //
    ///**
    // * Append to container
    // */
    //helpers.appendTo('container', renderer.domElement);
    //helpers.appendTo('container', plugins.Stats.instance.domElement);
    //
    //var render = {
    //    render: function () {
    //
    //        requestAnimationFrame(render.render);
    //
    //        /**
    //         * Return if it`s loading
    //         */
    //        if (loader.loading) {
    //            console.log('loading');
    //        }
    //
    //        /**
    //         * Render Composition
    //         */
    //        compositor.animate();
    //
    //        /**
    //         * Check Raycaster
    //         */
    //        raycaster.calculate();
    //
    //        /**
    //         * Stats
    //         */
    //        plugins.Stats.instance.update();
    //
    //        /**
    //         * Render
    //         */
    //        renderer.render(scene.a, camera.a);
    //
    //    }
    //};
    //
    //return render;

};