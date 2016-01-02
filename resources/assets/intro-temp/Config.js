module.exports = (function(){

    var configs = {};

    /**
     * Camera Initial Config
     */
    configs.camera = require('./configs/Camera');

    /**
     * Scene Initial Config
     */
    configs.scene = require('./configs/Scene');

    /**
     * Renderer Initial Config
     */
    configs.renderer = require('./configs/Renderer');

    /**
     * Get Elements
     */
    configs.elements = require('./configs/Elements');

    return configs;

})();