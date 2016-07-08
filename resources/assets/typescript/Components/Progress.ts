import {ComponentInterface} from "../Interfaces/ComponentInterface";

/**
 * Nav Component
 */
export class Progress implements ComponentInterface {

    register(Vue) {

        Vue.component('ark-progress', {
            template: require('../templates/progress.html'),
            props: {
                value: String,
                flat: Boolean,
            },
            computed: {
                style: function () {
                    return this.flat ? '--flat' : '';
                }
            }
        });

    }

}
