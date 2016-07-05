import {init} from "./Helpers";

/**
 * Application
 */

class App {

    /**
     * @type {{config: Config; component: Component; pages: Pages}}
     */
    public components = {
        config: require('./Config'),
        component: require('./Component'),
        pages: require('./Pages')
    };

    constructor() {

        for (let component in this.components) {

            for (let name in this.components[component]) {
                this.components[component] = new this.components[component][name];
            }

        }

    }

    /**
     * Init Page
     *
     * @param name
     * @param payload
     */
    public page(routeName:string, ...payload:any[]):any {

        this.components.pages.init(routeName, payload);

        // var name = toCamelCase(routeName);
        //
        // if (this.pages.hasOwnProperty(name))
        //     return new this.pages[name](this, ...payload);
        //
        // console.error(`\{ ${name} \} might have not being registrered.`);
        //
        // return null;

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

export let app = new App();
window.app = app;
