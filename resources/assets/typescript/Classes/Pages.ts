import {toCamelCase, extend, popByKey, requireAll} from "../Helpers";
import {Application} from "../Abstract/Aplication";
import Vue = require('vue');
import VueResource = require('vue-resource');

/**
 * Components
 */
export class Pages extends Application {

    /**
     * List of Loaded Classes
     */
    // public collection = [
    //     require('../Pages/Common'),
    //     require('../Pages/Test'),
    //     require('../Pages/Purchase'),
    //     require('../Pages/User/Profile'),
    //     require('../Pages/Project'),
    // ]

    public collection = requireAll(
        require.context("../Pages", true, /\.js$/)
    );

    /**
     * Initialized Objects
     */
    private initialized = {};
    private currentRoute = null;

    /**
     * Routes Mapping
     */
    private routes = {};
    private except = {};

    constructor(app) {

        super(app);

        this.collection.forEach(page => {

            for (let name in page) {

                let object = this.initialize(name, page[name]);

                if (object.hasOwnProperty('routes')) {
                    object.routes.forEach(route => this.setRoute(route, name));
                }

                if (object.hasOwnProperty('except')) {
                    object.except.forEach(route => this.setException(route, name));
                }

            }

        });

    }

    /**
     * Initialize Object
     *
     * @param app
     * @param name
     * @param object
     * @returns {any}
     */
    private initialize(name, object) {
        return this.initialized[name] = new object(
            this.app
        );
    }

    /**
     * Init
     * @param string routeName
     */
    public init(routeName, payload) {

        this.app.logger.info(
            `Current Route`, routeName
        );

        let route = this.currentRoute = toCamelCase(routeName);

        if (!this.routes.hasOwnProperty(route)) {

            this.app.logger.info('The current route has no listeners', routeName);

            /**
             * If there is no class listening to this request then only
             * run the common classes That has been set to listen to all {*}
             */
            this.create(
                this.routes['all'], payload
            );

            return this.start();

        }

        this.create(
            this.routes['all'].concat(this.routes[route]), payload
        );

        this.start();

    }

    /**
     * Start Vue Js
     */
    public start() {

        this.app.logger.info('Initializing Vue.js');

        /**
         * Binding Vue
         */
        this.app.ready().then(app => {

            let defaults = {
                el: '#app-root',
            }

            /**
             * Plugins
             */
            let obj = this.initPlugins(
                app.vueObject
            );

            let vue = new Vue(
                extend(defaults, obj)
            );

            app.vueInstance = vue;

        })

    }

    /**
     * Init Plugins
     * @param plugins
     */
    private initPlugins(obj):{} {

        if (obj.hasOwnProperty('plugins'))
            popByKey(obj, 'plugins', []).forEach(Plugin => {

                if (Plugin instanceof Function)
                    return Vue.use(Plugin);

                this.app.logger.error('Invalid Plugin', Plugin)

            })

        return obj
    }

    /**
     * Bootstrap All the Routes
     *
     * @param routes
     */
    private create(routes:string[], payload):void {

        if (routes instanceof Array)
            return routes.forEach(name => {
                
                let currentRoute = this.currentRoute;

                /**
                 * If page explicit exclude an route, then return before calling boot on it
                 */
                if (this.except.hasOwnProperty(currentRoute)
                    && this.except[currentRoute].includes(name)) {
                    return;
                }

                this.initialized[name].route = currentRoute;
                this.initialized[name].boot(...payload);
                
            });

        this.app.logger.error(
            'The Current route doesn\'t contain any bootable instances.'
        );

    }

    /**
     * Merge Routes
     * @param key
     * @param routes
     * @returns string[]
     */
    private mergeRoutes(routes:{}, route:string, value:string):string[] {

        if (routes.hasOwnProperty(route)) {
            return routes[route].concat(value);
        }

        return [value];
    }

    /**
     * Set or Merge Route
     *
     * @param string route
     * @param string element
     */
    private setRoute(route:string, element:string):void {

        route = route === '*' ? 'all' : route;

        let key = toCamelCase(route);

        this.routes[key] = this.mergeRoutes(
            this.routes, key, element
        );
    }

    /**
     * Set or Merge Route
     *
     * @param string route
     * @param string element
     */
    private setException(route:string, element:string):void {

        let key = toCamelCase(route);

        this.except[key] = this.mergeRoutes(
            this.except, key, element
        );
    }

}
