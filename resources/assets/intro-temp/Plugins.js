module.exports = (function (e) {

    // Require all of the scripts in the elements directory
    var plugins = require('bulk-require')(__dirname, ['plugins/**/*.js']).plugins;

    return e.plugins = plugins;

})(Engine);