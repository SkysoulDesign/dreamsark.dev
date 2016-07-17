import {ComponentInterface} from "../Interfaces/ComponentInterface";

/**
 * Nav Component
 */
export class Progress implements ComponentInterface {

    register(Vue) {

        Vue.component('ark-progress', {
            template: require('../templates/progress.html'),
            props: {
                data: Number,
                label: String,
                class: String,
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

    }

}
