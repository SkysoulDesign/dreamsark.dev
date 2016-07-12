"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Aplication_1 = require("../Abstract/Aplication");
/**
 * Components
 */
var Component = (function (_super) {
    __extends(Component, _super);
    /**
     * Register Components
     */
    function Component(app) {
        _super.call(this, app);
        /**
         * Components list
         * @type ComponentInterface[]
         */
        this.components = [
            require('../Components/Nav'),
            require('../Components/Form'),
            require('../Components/Ripple'),
            require('../Components/Statistics'),
            require('../Components/Progress'),
            require('../Components/Modal'),
            require('../Components/Social'),
            require('../Components/Flipper'),
            require('../Components/Steps'),
            require('../Components/Quote'),
        ];
        this.components.forEach(function (component) {
            for (var name_1 in component) {
                if (component.hasOwnProperty(name_1))
                    (new component[name_1]).register(require("vue"), app);
            }
        });
    }
    return Component;
}(Aplication_1.Application));
exports.Component = Component;
//# sourceMappingURL=Component.js.map