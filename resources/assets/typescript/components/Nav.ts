import {ComponentInterface} from "../interfaces/ComponentInterface";

/**
 * Nav Component
 */
export class Nav implements ComponentInterface {

    register(Vue) {

        Vue.component('ark-nav-item', {
            template: require('../templates/nav/item.html'),
            props: {
                url: {
                    type: String,
                    default: '#'
                },
                active: {
                    type: Boolean,
                    default: false
                }
            },
            computed: {
                style: function () {
                    return this.active ? '--active' : '';
                }
            }
        });

        Vue.component('ark-nav', {
            template: require('../templates/nav/nav.html')
        });

    }

}