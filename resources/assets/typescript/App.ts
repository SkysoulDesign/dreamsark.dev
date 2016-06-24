import Vue = require("vue");
import {Component} from "./Component";

/**
 * Application
 */

class App {

    public pages = {};

    constructor() {

        new Component();

        this.register(
            require('./Pages/User/Profile')
        )

    }

    register(...pages) {

        pages.forEach(page => {
            for (let name in page) {
                if (page.hasOwnProperty(name))
                    this.pages[name.toLowerCase()] = page[name];
            }
        });

    }

    /**
     * Init Page
     *
     * @param name
     * @param payload
     */
    public page(name:string, ...payload:any[]):any {

        var name = name.toLowerCase();

        if (this.pages.hasOwnProperty(name))
            return new this.pages[name](...payload);

        console.error(`\{ ${name} \} might have not being registrered.`);

        return null;

    }

    /**
     * Document Ready
     */
    ready() {
        return new Promise(resolve => document.addEventListener('DOMContentLoaded', () => resolve(this)));
    }

}

window.app = {};
window.app = new App();
window.app.ready().then(application => {

    // new Vue({
    //     el: '#app-root',
    //     data: {
    //         position: 'Director'
    //     },
    //     ready: function () {
    //         console.log(this)
    //     }
    // });

});