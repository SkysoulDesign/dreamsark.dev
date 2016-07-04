import {Component} from "./Component";

/**
 * Application
 */

export class App {

    public pages = {};

    constructor() {

        new Component();

        this.register(
            require('./Pages/Common'),
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
            return new this.pages[name](this, ...payload);

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

/**
 * Register to the window object
 * @type {App}
 */
window.app = new App();
