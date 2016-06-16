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
                e.preventDefault();
                console.dir();
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
        props: ['name', 'placeholder', 'type'],
    });

    Vue.component('ark-form', {
        template: require('./templates/form/form.html'),
        props: ['action', 'method'],
        data: () => {
            return {
                model: 'im model'
            }
        },
        components: [
            input
        ]
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
            console.log('hello world')
        }
    });

});