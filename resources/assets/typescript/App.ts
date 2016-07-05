import {extend} from "./Helpers";

/**
 * Application
 */
class App {

    public pages;
    public vueObject = {};

    /**
     * List of Providers
     */
    private components = {
        config: require('./Classes/Config'),
        component: require('./Classes/Component'),
        pages: require('./Classes/Pages'),
        logger: require('./Classes/Logger'),
    };

    constructor() {

        for (let component in this.components) {

            for (let name in this.components[component]) {
                this[component] = new this.components[component][name](this);
            }

        }

        this.bootstrap();

    }

    /**
     * Bootstrap all classes
     */
    private bootstrap() {

        for (let component in this.components)
            this[component].boot(this);

    }

    /**
     * Helper Function to Init a Page
     *
     * @param name
     * @param payload
     */
    public page(routeName:string, ...payload:any[]):void {
        this.pages.init(routeName, payload);
    }

    /**
     * Extend and get the vue Object
     *
     * @param obj
     * @returns {{}}
     */
    public vue(obj:{}):{} {

        return this.vueObject = extend(
            this.vueObject, obj
        );

    }

    /**
     * Document Ready
     */
    ready() {
        return new Promise(resolve => document.addEventListener(
            'DOMContentLoaded', () => resolve(this)
        ));
    }

}

/**
 * Register to the window object
 * @type {App}
 */

export let app = new App();
window.app = app;
