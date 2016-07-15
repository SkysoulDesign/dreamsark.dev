import {ComponentInterface} from "../Interfaces/ComponentInterface";

/**
 * Flipper Component
 */
export class Flipper implements ComponentInterface {

    register(vue) {

        let getTrigger = function (el):HTMLElement {
            return el.querySelector('[data-flipper-trigger]');
        }

        vue.component('ark-flipper', {
            template: require('../templates/flipper/flipper.html'),
            props: {
                class: String,
            },
            methods: {
                flip(){
                    this.$children.forEach(function (child) {
                        child.$el.classList.toggle('+hidden')
                    })
                    this.$el.classList.toggle('--flipped')
                },
            }

        });

        vue.component('ark-flipper-content', {

            template: require('../templates/flipper/side.html'),
            props: {
                class: String,
                side: {
                    type: String,
                    required: true
                },
            },
            ready(){

                getTrigger(this.$el).addEventListener('click', event => {
                    event.preventDefault();
                    this.$parent.flip()
                });

                this.$dispatch('flipper.block.enabled', ...[this])

            }

        });

    }

}

