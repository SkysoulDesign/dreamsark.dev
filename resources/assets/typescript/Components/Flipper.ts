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

            methods: {
                flip(){
                    this.$children.forEach(function(child){
                        child.$el.classList.toggle('+hidden')
                    })
                    this.$el.classList.toggle('--flipped')
                },
            }

        });

        vue.component('ark-flipper-front', {

            template: require('../templates/flipper/front.html'),

            ready(){

                getTrigger(this.$el).addEventListener('click', event => {
                    event.preventDefault();
                    this.$parent.flip()
                });

            }

        });

        vue.component('ark-flipper-back', {

            template: require('../templates/flipper/back.html'),

            ready(){

                getTrigger(this.$el).addEventListener('click', event => {
                    event.preventDefault();
                    this.$parent.flip()
                });

            }

        });

    }

}

