import {extend, requireAll} from "./Helpers";
import Promise = require('bluebird');

/**
 * Application
 */
export class App {

    public pages;
    public vueObject = {
        events: {},
        plugins: [],
        mixins: []
    };

    public plugins = {};

    constructor() {

        this.bootstrap(this, requireAll(
            require.context("./Classes", false, /\.js$/)
        ));

    }

    /**
     * Bootstrap all classes
     */
    public bootstrap(container: Object, components: Object[], ...params: any[]): Object {

        let collection = [],
            parameters = params.length ? params : [container];

        for (let component in components) {
            for (let name in components[component]) {
                let instance = new components[component][name](...parameters);
                collection.push(instance);
                container[name.toLowerCase()] = instance;
            }
        }

        collection.forEach(function (component) {
            component.boot(...parameters);
        })

        return container;

    }

    /**
     * Install Plugins
     * @param plugin
     */
    public install(plugins) {

        for (let name in plugins) {
            this.plugins[name.toLowerCase()] = plugins[name];
        }

    }

    /**
     * Get Plugin
     *
     * @param name
     * @returns {any}
     */
    public plugin(name: string, ...args) {

        name = name.toLowerCase();

        if (this.plugins.hasOwnProperty(name)) {

            if (this.plugins[name] instanceof Function) {
                return new this.plugins[name](this, ...args)
            }

            return this.plugins[name];

        }

        console.log(`Plugin { ${name} } not found. did you install it already?`);

    }

    /**
     * Helper Function to Init a Page
     *
     * @param name
     * @param payload
     */
    public page(routeName: string, ...payload: any[]): void {
        this.pages.init(routeName, payload);
    }

    /**
     * Extend and get the vue Object
     *
     * @param obj
     */
    public vue(obj: any = {}) {

        /**
         * if Plugins is set Append it to root plugin property
         */
        if (obj.hasOwnProperty('plugins')) {

            this.vueObject.plugins = obj.plugins.concat(
                this.vueObject.plugins
            )

            delete obj.plugins;
        }

        this.vueObject.mixins.push(obj);
    }

    /**
     * Subscribe on event listeners
     *
     * @param name
     * @param callback
     */
    public on(name: string, callback: Function) {

        this.vueObject.events = extend(this.vueObject.events, {
            [name]: callback
        })

    }

    /**
     * Document Ready
     */
    public ready() {
        return new Promise(resolve => document.addEventListener(
            'DOMContentLoaded', () => {
                resolve(this);
            }
        ));
    }

    /**
     * Exposes Plugin globally
     * @param instance
     */
    public exposes(instance: any) {

        /**
         * Register Globally Globaly
         */
        for (let name in instance) {

            if (window.hasOwnProperty(name)) {
                console.log(
                    'You are overriding an already set object, caution it might lead to undesirable behavior', instance, name
                )
            }

            window[name] = instance[name];

        }

    }

}

/**
 * Register to the window object
 */
window['dreamsark'] = new App();


