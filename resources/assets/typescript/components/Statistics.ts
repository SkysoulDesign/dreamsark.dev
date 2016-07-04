import {ComponentInterface} from "../interfaces/ComponentInterface";

/**
 * Statistics Component
 */
export class Statistics implements ComponentInterface {

    register(Vue) {

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

    }

}