import {ComponentInterface} from "../Interfaces/ComponentInterface";

/**
 * Steps Component
 */
export class Steps implements ComponentInterface {

    register(vue, app) {

        vue.component('ark-steps', {
                template: require('html!../templates/steps/steps.html'),
                data: function () {
                    return {
                        steps: 1
                    }
                },
                ready(){
                    this.$children.every(function (child) {

                        if (!child.active)
                            child.setDone()

                        return !child.active;

                    })

                }
            }
        );

        vue.component('ark-step', {
                template: require('html!../templates/steps/step.html'),
                data: function () {
                    return {
                        step: this.$parent.steps++,
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

