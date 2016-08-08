"use strict";
var Vue = require("vue");
/**
 * Components
 */
var Component = (function () {
    /**
     * Register Components
     */
    function Component() {
        /**
         * Components list
         * @type ComponentInterface[]
         */
        this.components = [
            require('./components/Form'),
            require('./components/Ripple'),
            require('./components/Nav'),
            require('./components/Statistics'),
            require('./components/Progress'),
            require('./components/Modal'),
        ];
        this.components.forEach(function (component) {
            for (var name_1 in component) {
                if (component.hasOwnProperty(name_1))
                    (new component[name_1]).register(Vue);
            }
        });
    }
    return Component;
}());
exports.Component = Component;
//# sourceMappingURL=Component.js.map