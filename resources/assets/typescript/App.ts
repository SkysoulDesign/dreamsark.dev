import Vue = require("vue");

export class App {

    constructor() {
        // let ripple = new Ripple();
        // console.log(Vue);
    }

    /**
     * Document Ready
     * @returns {Promise<T>|Promise}
     */
    ready() {
        return new Promise(resolve => document.addEventListener('DOMContentLoaded', () => resolve(this)));
    }

}

let app = new App();
app.ready().then(application => {

    var rippleButton = Vue.component('ripple-button', {
        template: require('./templates/ripple-button.html'),
        props: ['type'],
        methods: {
            submit(e:MouseEvent) {

                /**
                 * If its not a submit type then prevent defaults
                 */
                if (this.type != 'submit')
                    e.preventDefault();

            }
        },
        data() {
            return {
                test: 'hello world'
            }
        },
        ready(){

        }
    });

    var input = Vue.component('ark-input', {
        template: require('./templates/form/input.html'),
        props: {
            name: {
                type: String,
                required: true
            },
            placeholder: {
                type: String,
                default: function () {
                    return this.name
                }
            },
            type: {
                type: String,
                default: 'text'
            },
            title: {
                type: String,
                default: function () {
                    return this.name
                }
            }
        },
        computed: {
            errors: function () {
                let value = this.$parent.errors[this.name];

                delete this.$parent.errors[this.name];

                return value ;
            }
        }
    });

    Vue.component('ark-form', {
        template: require('./templates/form/form.html'),
        props: {
            token: String,
            action: {
                type: String,
                required: true
            },
            method: {
                type: String,
                default: 'post'
            },
            errors: {
                coerce: data => JSON.parse(data)
            }
        },
        computed: {
            mistakes: function () {
                return this.errors;
            }
        },
        ready(){
            this.model = this.errors;
        }
    });

    // var child = Vue.component('ark-input', {
    //     template: '<div class="test">testchild</div>'
    // });
    //
    // var parent = Vue.component('ark-form', {
    //     template: '<div class="test"><slot></slot></div>',
    //     components: {
    //         child: child
    //     }
    // });

    new Vue({
        el: '#app-root',
        ready: function () {
            console.log(this)
        }
    });

});