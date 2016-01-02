module.exports = (function (e) {

    /**
     * Append Stats to Engine
     */
    return e.stats = {

        stats: null,

        init: function () {
            this.stats = require('stats.js')();
        },

        configure: function (configs) {

            var domElement = this.domElement;

            domElement.style.position = 'absolute';
            domElement.style.zIndex = 6;

            e.helpers.appendTo(configs.container, domElement);

        }

    };

})(Engine);