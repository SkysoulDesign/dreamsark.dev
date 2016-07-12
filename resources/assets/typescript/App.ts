import {extend} from "./Helpers";
import {Logger} from "./Classes/Logger";
import {Config} from "./Classes/Config";

/**
 * Application
 */
class App {

    public pages;
    public vueObject = {};
    public plugins = {};

    public config = new Config();
    public logger = new Logger(
        this.config
    );

    /**
     * List of Providers
     */
    private components = {
        component: require('./Classes/Component'),
        pages: require('./Classes/Pages')
    };

    constructor() {
        this.bootstrap(this, this.components);
    }

    /**
     * Bootstrap all classes
     */
    private bootstrap(container:Object = this, components:{}) {

        this.logger.group('Core', logger => {

            for (let component in components) {

                for (let name in components[component]) {
                    logger.group(name, () => {
                        container[component] = new components[component][name](container);
                    })
                }

            }

            for (let component in components)
                container[component].boot(container);

        })

    }

    /**
     * Destruct all classes
     */
    private destruct() {

        for (let component in this.components)
            this[component].destruct(this);

        console.timeEnd('Application Runtime');

    }

    /**
     * Install Plugins
     * @param plugin
     */
    public install(plugin) {
        this.logger.group(`Plugin: ${plugin.name}`, logger => {

            this.plugins[plugin.name.toLowerCase()] = new plugin(this);

        }, false)
    }

    /**
     * Get Plugin
     * @param name
     * @returns {any}
     */
    public plugin(name:string) {

        name = name.toLowerCase();

        if (this.plugins.hasOwnProperty(name)) {
            return this.plugins[name];
        }

        this.logger.error(`Plugin { ${name} } not found. did you install it already?`);
    }

    /**
     * Helper Function to Init a Page
     *
     * @param name
     * @param payload
     */
    public page(routeName:string, ...payload:any[]):void {
        this.logger.group(`Page`, logger => {
            this.pages.init(routeName, payload);
        }, false)
    }

    /**
     * Extend and get the vue Object
     *
     * @param obj
     * @returns {{}}
     */
    public vue(obj:{} = {}) {

        if (obj.hasOwnProperty('ready')) {
            console.log('todo: better merge the ready property on vue-js');
        }

        return this.vueObject = extend(
            this.vueObject, obj
        );

    }

    /**
     * Document Ready
     */
    ready() {
        return new Promise(resolve => document.addEventListener(
            'DOMContentLoaded', () => {
                resolve(this);
                this.destruct();
            }
        ));

    }

    /**
     * Exposes Plugin globally
     * @param instance
     */
    exposes(instance:any) {

        /**
         * Register Globally Globaly
         */
        for (let name in instance) {

            if (window.hasOwnProperty(name)) {
                this.logger.warn('You are overriding an already set object, caution it might lead to undesirable behavior', instance, name)
            }

            window[name] = instance[name];

        }

    }

}

/**
 * Register to the window object
 * @type {App}
 */
window['dreamsark'] = new App();


