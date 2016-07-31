"use strict";
/**
 * Nav Component
 */
var Progress = (function () {
    function Progress() {
    }
    Progress.prototype.register = function (Vue) {
        Vue.component('ark-progress', {
            template: require('html!../templates/progress.html'),
            props: {
                data: {
                    type: Number,
                    default: 100
                },
                label: String,
                class: String,
                live: {
                    type: Array,
                },
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
                    var percentage = Math.round((this.data / this.max) * 100);
                    return percentage > 100 ? 100 : percentage;
                }
            },
            ready: function () {
                var _this = this;
                if (this.live) {
                    var start_1 = Date.parse(this.live[0]), end_1 = Date.parse(this.live[1]), interval_1 = setInterval(function () {
                        var now = (new Date).getTime(), q = Math.abs(now - start_1), d = Math.abs(end_1 - start_1), percentage = (q / d) * 100;
                        if (percentage > 100) {
                            _this.data = 100;
                            return clearInterval(interval_1);
                        }
                        _this.data = Math.round(percentage);
                    }, 1000);
                }
            }
        });
    };
    return Progress;
}());
exports.Progress = Progress;
//# sourceMappingURL=Progress.js.map