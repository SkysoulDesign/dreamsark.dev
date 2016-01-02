module.exports = (function (e) {

    return {

        /**
         * Set The Order that the compositions should be loaded
         */
        compositions: [
            'loading',
            'universe'
        ],

        renderer: {
            container: '#container'
        },

        stats: {
            enabled: true,
            container: '#container'
        }

    }

})(Engine);