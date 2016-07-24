import {ComponentInterface} from "../Interfaces/ComponentInterface";

/**
 * Statistics Component
 */
export class Pagination implements ComponentInterface {

    register(Vue) {

        /**
         * Pagination
         */
        Vue.component('ark-pagination', {
            template: require('../templates/pagination/pagination.html'),
            props: {
                data: Object
            },
            methods: {
                sayHi(){
                    console.log('hi');
                }
            }
        });

        Vue.component('ark-pagination-step', {
            template: require('../templates/pagination/step.html')
        });

    }

}
