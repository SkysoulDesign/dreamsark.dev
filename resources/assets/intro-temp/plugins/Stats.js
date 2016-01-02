module.exports = (function (e) {

    return {

        /**
         * Plugin Instance
         */
        instance: null,

        init: function (camera, domElement) {
            return this.plugin(camera ? camera : e.camera.a, domElement);
        },

        plugin: function () {
            var stats = require('stats.js');
            return this.instance = new stats();
        },

        configure: function (plugin) {
            plugin.domElement.style.position = 'absolute';
            plugin.domElement.style.top      = '0px';
        }

    }

})(Engine);