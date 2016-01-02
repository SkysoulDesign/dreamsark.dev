module.exports = (function (e) {

    /**
     * Require all of the scripts in the compositions directory
     */
    var compositions = require('bulk-require')(__dirname, ['compositions/**/*.js']).compositions;

    /**
     * Attach Compositions to Engine
     */
    return e.compositions = compositions;

})(Engine);