import {ComponentInterface} from "../Interfaces/ComponentInterface";

/**
 * Profiles Component
 */
export class Animation implements ComponentInterface {

    register(vue, app) {

        vue.component('ark-animation', {
            template: require('html!../templates/animation/animation.html'),
            props: {
                class: String,
                composition: {
                    type: String,
                    required: true,
                },
                payload: {
                    type: Array
                },
            },
            ready(){

                let animation = app.plugin('intro', this.$el)
                    animation.start(this.composition, ...this.payload)

                this.$dispatch('animation.started', ...this.payload);

            }
        });

    }

}
