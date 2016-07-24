import {ComponentInterface} from "../Interfaces/ComponentInterface";

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
                icon: String,
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
