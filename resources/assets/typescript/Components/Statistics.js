"use strict";
/**
 * Statistics Component
 */
var Statistics = (function () {
    function Statistics() {
    }
    Statistics.prototype.register = function (Vue) {
        /**
         * Statistics
         */
        var item = Vue.component('statistic-item', {
            template: require('html!../templates/statistics/item.html'),
            props: {
                icon: String,
                round: Boolean,
                data: {
                    type: String,
                    required: true
                }
            }
        });
        Vue.component('ark-statistics', {
            template: require('html!../templates/statistics/statistics.html'),
            props: {
                size: {
                    type: String,
                    default: 'small'
                }
            }
        });
    };
    return Statistics;
}());
exports.Statistics = Statistics;
//# sourceMappingURL=Statistics.js.map