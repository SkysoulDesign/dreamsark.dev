import {ComponentInterface} from "../Interfaces/ComponentInterface";

/**
 * Form Component
 */
export class Modal implements ComponentInterface {

    register(vue, app) {

        vue.component('ark-modal', {
            template: require('html!../templates/modal/modal.html'),
            props: {
                trigger: {
                    type: String,
                    required: true,
                },
                header: {
                    type: String,
                    required: true,
                }
            },
            methods: {
                show(){
                    this.$el.classList.add('--open');
                },
                close(){
                    this.$el.classList.remove('--open');
                }
            },

            ready(){
                var trigger = document.querySelector(`[data-modal-trigger="${this.trigger}"]`);
                    trigger.addEventListener('click', event => this.show());
            }
        });

    }

}

