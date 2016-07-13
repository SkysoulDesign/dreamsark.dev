import {ComponentInterface} from "../Interfaces/ComponentInterface";

/**
 * Quote Component
 */
export class Quote implements ComponentInterface {

    register(vue, app) {

        /**
         * @todo bug. when tab is not active, the quote will be display none then when try to get offsetHeight will return 0
         */
        vue.component('ark-quote', {
                template: require('../templates/quote/quote.html'),
                props: {
                    expandable: {
                        type: Boolean,
                        default: true
                    },
                    maxHeight: {
                        type: Number,
                        default: 300
                    },
                    expandText: {
                        type: String,
                        default: 'expand'
                    }
                },
                methods: {
                    expand: function () {
                        this.$el.classList.remove('--collapsed');
                        this.$el.style.removeProperty('max-height');
                    }
                },
                ready(){

                    if (this.expandable &&
                        this.$el.offsetHeight > this.maxHeight) {
                        this.$el.classList.add('--collapsed');
                        this.$el.style.maxHeight = this.maxHeight + 'px';
                    }

                }
            }
        );

    }

}

