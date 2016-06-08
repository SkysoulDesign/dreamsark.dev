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

        // new Vue({
        //     el:'#app-root',
        //     template: require('./templates/segment.html'),
        //     data: {
        //         test: 'as world'
        //     },
        //
        // });

    });