import {ComponentInterface} from "../Interfaces/ComponentInterface";

/**
 * Steps Component
 */
export class Steps implements ComponentInterface {

    register(vue, app) {

        vue.component('ark-steps', {
                template: require('../templates/steps/steps.html'),
                props: {},
                ready(){

                    this.$children.forEach(function (child) {

                        if (!child.active)
                            child.setDone()

                    })

                }
            }
        );

        vue.component('ark-step', {
                template: require('../templates/steps/step.html'),
                data: function () {
                    return {
                        done: false
                    }
                },
                props: {
                    description: {
                        type: String
                    },
                    active: {
                        type: Boolean
                    }
                },
                methods: {
                    setDone(){
                        this.done = true;
                        this.$el.classList.add('--done')
                    }
                }
            }
        );

    }

}

