module.exports = (function () {

    /**
     * Require all of the scripts in the composition directory
     */
    return require('bulk-require')(__dirname, ['compositions/**/*.js']).compositions;

})();