import {ComponentInterface} from "../Interfaces/ComponentInterface";

/**
 * Accordion Component
 */
export class Accordion implements ComponentInterface {

    register(vue, app) {

        vue.component('ark-accordion-item', {
            template: require('../templates/accordion/accordion-item.html'),
            props: {
                show: Boolean
            },
            methods: {
                toggle(){
                    this.show = !this.show;
                    this.$dispatch('item-show', this);
                }
            }
        });

        vue.component('ark-accordion', {
            template: require('../templates/accordion/accordion.html'),
            data: function () {
                return {
                    active: null
                }
            },
            events: {
                'item-show': function (active) {
                    this.$children.forEach(function (accordion) {
                        if (accordion !== active)
                            accordion.show = false;
                    })
                },
            }
        });

    }

}

