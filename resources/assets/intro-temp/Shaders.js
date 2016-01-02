module.exports = (function (e) {

    // Require all of the scripts in the elements directory
    var shaders = require('bulk-require')(__dirname, ['shaders/**/*.js']).shaders;

    return e.shaders = {

        init: function () {

            /**
             * Init All Shaders
             */
            e.helpers.init(shaders);

        }

    };

})(Engine);