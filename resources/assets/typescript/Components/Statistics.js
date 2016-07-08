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
            template: require('../templates/statistics/item.html'),
            props: {
                data: {
                    type: String,
                    required: true
                }
            }
        });
        Vue.component('ark-statistics', {
            template: require('../templates/statistics/statistics.html')
        });
    };
    return Statistics;
}());
exports.Statistics = Statistics;
//# sourceMappingURL=Statistics.js.map