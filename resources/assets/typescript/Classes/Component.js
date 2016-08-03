"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Aplication_1 = require("../Abstract/Aplication");
var Helpers_1 = require("../Helpers");
/**
 * Components
 */
var Component = (function (_super) {
    __extends(Component, _super);
    /**
     * Register Components
     */
    function Component(app) {
        var _this = this;
        _super.call(this, app);
        /**
         * @type {{}}
         */
        this.initialized = {};
        this.components = Helpers_1.requireAll(require.context("../Components", false, /\.js$/));
        this.components.forEach(function (component) {
            for (var name_1 in component) {
                if (component.hasOwnProperty(name_1)) {
                    var instance = new component[name_1];
                    instance.register(require("vue"), app);
                    _this.initialized[name_1] = instance;
                }
            }
        });
    }
    /**
     * Components list
     * @type ComponentInterface[]
     */
    Component.prototype.requireAll = function (requireContext) {
        return requireContext.keys().map(function (item) {
            return 'hora';
        });
    };
    return Component;
}(Aplication_1.Application));
exports.Component = Component;
//# sourceMappingURL=Component.js.map