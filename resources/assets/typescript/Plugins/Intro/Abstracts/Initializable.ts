import {requireAll, toCamelCase} from "../../../Helpers";
import {BootableInterface} from "../../../Interfaces/BootableInterface";
import {Intro} from "../Intro";
import {zip} from "../../Helpers";
import Promise = require("bluebird");

/**
 * Initializable Class
 */
export abstract class Initializable implements BootableInterface {

    /**
     * Public properties that must to be overridden
     */
    abstract get collection(): Function;

    abstract instances;

    abstract initialize(instance: any): Promise<any>;

    public app: Intro;
    protected hasCollection: boolean = Object.keys(this.collection).length !== 0;

    boot(app) {

        this.app = app;

        /**
         * If Collection is empty, then don't attempt to load it
         */
        if (!this.hasCollection) return;

        requireAll(this.collection).forEach(object => {
            for (let name in object) {
                this.instances[toCamelCase(name)] = {
                    loaded: false,
                    instance: null,
                    constructor: object[name]
                }
            }
        })

    }

    /**
     * Get Object by its name
     *
     * @param object
     * @returns {"bluebird".Bluebird}
     */
    public get(object: string): Promise<any> {

        let name = toCamelCase(object);

        return new Promise((accept, reject) => {

            if (this.instances.hasOwnProperty(name)) {

                /**
                 * If already loaded send it
                 */
                if (this.instances[name].loaded) {
                    return accept(this.instances[name].instance)
                }

                return this
                    .initialize(
                        new this.instances[name].constructor(this.app)
                    )
                    .then(instance => {
                        this.instances[name].instance = instance
                        this.instances[name].loaded = true
                        instance.name = name;
                        accept(instance)
                    })
            }

            if (!this.hasCollection) {
                return this
                    .initialize(object)
                    .then(instance => {
                        this.instances[name] = {
                            instance: instance,
                            loaded: true,
                            constructor: null
                        }
                        instance.name = name;
                        accept(instance)
                    })
            }

            throw `object doesnt contain own property ${name}`;

        })
    }

    /**
     * Load objects
     *
     * @param objects
     * @returns {Bluebird<U>}
     */
    load(objects: Object): Promise<any> {

        let keys = Object.keys(objects),
            items = keys.map(key => objects[key]);

        return Promise
            .map(items, item => this.get(item))
            .then(resolutions => zip(resolutions, keys))
    }

}
