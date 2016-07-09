"use strict";
/**
 * Nav Component
 */
var Progress = (function () {
    function Progress() {
    }
    Progress.prototype.register = function (Vue) {
        Vue.component('ark-progress', {
            template: require('../templates/progress.html'),
            props: {
                value: String,
                flat: Boolean,
            },
            computed: {
                style: function () {
                    return this.flat ? '--flat' : '';
                }
            }
        });
    };
    return Progress;
}());
exports.Progress = Progress;
//# sourceMappingURL=Progress.js.map