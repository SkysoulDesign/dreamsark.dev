import {ComponentInterface} from "../interfaces/ComponentInterface";

/**
 * Form Component
 */
export class Modal implements ComponentInterface {

    register(Vue) {

        Vue.component('ark-modal', {
            template: require('../templates/modal/modal.html'),
            props: {
                class: {
                    type: String
                }
            },
            methods: {
                open(){
                    console.log('opening');
                    this.$el.classList.toggle('--open');
                    this.$children[0].show();
                }
            }
        });

        Vue.component('ark-modal-window', {
            template: require('../templates/modal/modal-window.html'),
            methods: {
                show(){
                    this.$el.classList.remove('+hidden');
                },
                close(){
                    console.log(this.$el)
                    this.$el.classList.add('+hidden');
                }
            }
        });

    }

}

