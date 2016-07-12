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
                percentage: function() {
                    return (this.data / this.max) * 100;
                },
                style: function () {
                    return `--color-${ this.color }` + (this.flat ? '--flat' : '')
                }
            }
        });

    }

}
