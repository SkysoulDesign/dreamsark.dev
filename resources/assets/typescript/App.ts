import {extend} from "./Helpers";
import {Logger} from "./Classes/Logger";
import {Config} from "./Classes/Config";

/**
 * Application
 */
class App {

    public pages;
    public vueObject = {
        events: {},
        plugins: [],
        mixins: []
    };

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
    public install(plugins) {

        for (let name in plugins) {
            this.logger.group(`Plugin: ${name}`, logger => {
                this.plugins[name.toLowerCase()] = plugins[name];
            }, false)
        }

    }

    /**
     * Get Plugin
     * @param name
     * @returns {any}
     */
    public plugin(name:string, ...args) {

        name = name.toLowerCase();

        if (this.plugins.hasOwnProperty(name)) {

            if(this.plugins[name] instanceof Function){
                return new this.plugins[name](this, ...args)
            };

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
     */
    public vue(obj:any = {}) {

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
     * @param name
     * @param callback
     */
    public on(name:string, callback:Function) {

        this.vueObject.events = extend(this.vueObject.events, {
            [name]: callback
        })

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


