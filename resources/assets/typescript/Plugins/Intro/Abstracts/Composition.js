"use strict";
/**
 * Composition
 */
var Composition = (function () {
    function Composition() {
    }
    /**
     * This Method is no need to be implemented
     * but it can be override if needed
     * @param app
     */
    Composition.prototype.boot = function (app) {
        this.app = app;
        this.scene = app.scene;
        this.camera = app.camera;
        this.renderer = app.renderer;
    };
    ;
    Object.defineProperty(Composition.prototype, "objects", {
        /**
         * List of objects to be loaded
         * @returns {Array}
         */
        get: function () { },
        enumerable: true,
        configurable: true
    });
    return Composition;
}());
exports.Composition = Composition;
//# sourceMappingURL=Composition.js.map