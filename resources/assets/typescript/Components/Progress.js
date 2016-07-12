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
                data: Number,
                label: String,
                max: {
                    type: Number,
                    default: 100
                },
                color: {
                    type: String,
                    default: 'success'
                },
                symbol: {
                    type: String,
                    default: '%'
                },
                flat: Boolean,
            },
            computed: {
                percentage: function () {
                    return (this.data / this.max) * 100;
                },
                style: function () {
                    return ("--color-" + this.color) + (this.flat ? '--flat' : '');
                }
            }
        });
    };
    return Progress;
}());
exports.Progress = Progress;
//# sourceMappingURL=Progress.js.map