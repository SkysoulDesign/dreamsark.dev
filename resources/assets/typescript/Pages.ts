import {toCamelCase} from "./Helpers";
import {app} from "./App";

/**
 * Components
 */
export class Pages {

    /**
     * @type {any[]}
     */
    public collection = [
        require('./Pages/Common'),
        require('./Pages/Test'),
        require('./Pages/Purchase'),
    ]

    /**
     * Initialized Objects
     */
    private initialized = {};

    /**
     * Routes Mapping
     */
    private routes = {};

    constructor() {

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

        if (app.components.config.debug) {
            console.info(`Current Route { ${routeName} }`);
        }

        let route = toCamelCase(routeName);

        if (!this.routes.hasOwnProperty(route)) {
            return console.error(`There is no registered route with the name of ${routeName}`);
        }

        this.routes['all'].concat(this.routes[route]).forEach(name => {
            this.initialized[name].boot();
        });

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
