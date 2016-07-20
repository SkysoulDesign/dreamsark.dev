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
                class: String,
                size: {
                    type: String,
                    default: 'normal' //normal, medium, large
                },
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
                animated: Boolean,
                mini: Boolean,
                mode: {
                    type: String,
                    default: 'normal'
                }
            },
            computed: {
                percentage: function () {
                    return Math.round((this.data / this.max) * 100);
                }
            }
        });
    };
    return Progress;
}());
exports.Progress = Progress;
//# sourceMappingURL=Progress.js.map