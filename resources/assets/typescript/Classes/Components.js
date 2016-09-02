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
var Components = (function (_super) {
    __extends(Components, _super);
    /**
     * Register Components
     */
    function Components(app) {
        var _this = this;
        _super.call(this, app);
        /**
         * Components collection
         */
        this.collection = {};
        this.vue = require("vue");
        var components = Helpers_1.requireAll(require.context("../Components", false, /\.js$/));
        components.forEach(function (component) {
            for (var name_1 in component) {
                if (component.hasOwnProperty(name_1)) {
                    var instance = new component[name_1];
                    instance.register(_this.vue, app);
                    _this.collection[name_1] = instance;
                }
            }
        });
    }
    return Components;
}(Aplication_1.Application));
exports.Components = Components;
//# sourceMappingURL=Components.js.map