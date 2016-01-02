module.exports = (function () {

    /**
     * Require all of the scripts in the Fonts directory
     */
    return require('bulk-require')(__dirname, ['fonts/**/*.js']).fonts;

})();