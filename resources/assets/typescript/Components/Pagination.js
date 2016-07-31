"use strict";
/**
 * Statistics Component
 */
var Pagination = (function () {
    function Pagination() {
    }
    Pagination.prototype.register = function (Vue) {
        /**
         * Pagination
         */
        Vue.component('ark-pagination', {
            template: require('html!../templates/pagination/pagination.html'),
            props: {
                data: Object
            },
            methods: {
                sayHi: function () {
                    console.log('hi');
                }
            }
        });
        Vue.component('ark-pagination-step', {
            template: require('html!../templates/pagination/step.html')
        });
    };
    return Pagination;
}());
exports.Pagination = Pagination;
//# sourceMappingURL=Pagination.js.map