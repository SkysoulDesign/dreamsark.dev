import {extend} from "./Helpers";
import {Logger} from "./Classes/Logger";
import {Config} from "./Classes/Config";

/**
 * Application
 */
class App {

    public pages;
    public vueObject = {};

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

        this.logger.group('Core', logger => {

            for (let component in this.components) {

                for (let name in this.components[component]) {
                    logger.group(name, () => {
                        this[component] = new this.components[component][name](this);
                    })
                }

            }

            this.bootstrap();

        })

    }

    /**
     * Bootstrap all classes
     */
    private bootstrap() {

        for (let component in this.components)
            this[component].boot(this);

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
    public vue(obj:{}) {

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

}

/**
 * Register to the window object
 * @type {App}
 */

export let app = new App();
global.app = app;


