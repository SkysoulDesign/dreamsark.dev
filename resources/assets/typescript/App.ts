import Vue = require("vue");
import {popByKey} from "./Helpers";

/**
 * Application
 */
export class App {

    constructor() {
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
                return popByKey(this.$parent.errors, this.name);
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
                type: [Object, Array],
                coerce: data => JSON.parse(data)
            }
        }
    });

    new Vue({
        el: '#app-root',
        ready: function () {
            console.log(this)
        }
    });

});