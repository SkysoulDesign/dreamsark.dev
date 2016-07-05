import {toCamelCase, extend} from "../Helpers";
import {Application} from "../Abstract/Aplication";
import Vue = require('vue');

/**
 * Components
 */
export class Pages extends Application {

    /**
     * List of Loaded Classes
     */
    public collection = [
        require('../Pages/Common'),
        require('../Pages/Test'),
        require('../Pages/Purchase'),
        require('../Pages/User/Profile'),
    ]

    /**
     * Initialized Objects
     */
    private initialized = {};

    /**
     * Routes Mapping
     */
    private routes = {};

    constructor(app) {

        super(app);

        this.collection.forEach(page => {

            for (let name in page) {

                let object = this.initialize(name, page[name]);

                if (object.hasOwnProperty('routes')) {
                    object.routes.forEach(route => this.setRoute(route, name));
                }

            }

        });

    }

    /**
     * Initialize Object
     *
     * @param name
     * @param object
     * @returns {any}
     */
    private initialize(name, object) {
        return this.initialized[name] = new object;
    }

    /**
     * Init
     * @param string routeName
     */
    public init(routeName) {

        this.app.logger.info(
            `Current Route`, routeName
        );

        let route = toCamelCase(routeName);

        if (!this.routes.hasOwnProperty(route)) {

            this.app.logger.info('The current route has no listeners', routeName);

            /**
             * If there is no class listening to this request then only
             * run the common classes That has been set to listen to all {*}
             */
            this.create(
                this.routes['all']
            );

            return this.start();

        }

        this.create(
            this.routes['all'].concat(this.routes[route])
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

            new Vue(
                extend(defaults, app.vue())
            );

        })

    }

    /**
     * Bootstrap All the Routes
     *
     * @param routes
     */
    private create(routes:string[]):void {

        if (routes instanceof Array)
            return routes.forEach(
                name => this.initialized[name].boot(
                    this.app
                )
            );

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
    private mergeRoutes(route:string, value:string):string[] {

        if (this.routes.hasOwnProperty(route)) {
            return this.routes[route].concat(value);
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

        this.routes[key] = this.mergeRoutes(key, element);
    }

}
