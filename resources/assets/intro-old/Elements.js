module.exports = (function (e) {

    /**
     * Require all of the scripts in the elements directory
     */
    return e.elements = require('bulk-require')(__dirname, ['elements/**/*.js']).elements;

})(Engine);