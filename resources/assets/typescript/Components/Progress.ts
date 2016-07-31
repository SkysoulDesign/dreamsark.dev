import {ComponentInterface} from "../Interfaces/ComponentInterface";

/**
 * Nav Component
 */
export class Progress implements ComponentInterface {

    register(Vue) {

        Vue.component('ark-progress', {
            template: require('html!../templates/progress.html'),
            props: {
                data: {
                    type: Number,
                    default: 100
                },
                label: String,
                class: String,
                live: {
                    type: Array,
                },
                size: {
                    type: String,
                    default: 'normal' //normal, medium, large
                },
                max: {
                    type: Number,
                    default: 100
                },
                color: {
                    type: String,
                    default: 'success'
                },
                symbol: {
                    type: String,
                    default: '%'
                },
                flat: Boolean,
                animated: Boolean,
                mini: Boolean,
                mode: {
                    type: String,
                    default: 'normal'
                }
            },
            computed: {
                percentage: function () {
                    let percentage = Math.round((this.data / this.max) * 100);
                    return percentage > 100 ? 100 : percentage;
                }
            },
            ready(){

                if (this.live) {

                    let start = Date.parse(this.live[0]),
                        end = Date.parse(this.live[1]),
                        interval = setInterval(() => {

                            let now = (new Date).getTime(),
                                q = Math.abs(now - start),
                                d = Math.abs(end - start),
                                percentage = (q / d) * 100;

                            if (percentage > 100) {
                                this.data = 100;
                                return clearInterval(interval)
                            }

                            this.data = Math.round(percentage);

                        }, 1000);

                }
            }
        });

    }

}
