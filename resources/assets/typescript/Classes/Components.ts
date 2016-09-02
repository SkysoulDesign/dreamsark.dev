import {Application} from "../Abstract/Aplication";
import {requireAll} from "../Helpers";

/**
 * Components
 */
export class Components extends Application {

    /**
     * Components collection
     */
    public collection = {};
    public vue = require("vue");

    /**
     * Register Components
     */
    constructor(app) {

        super(app);

        const components = requireAll(
            require.context("../Components", false, /\.js$/)
        );

        components.forEach(component => {

            for (let name in component) {

                if (component.hasOwnProperty(name)) {
                    let instance = new component[name];
                    instance.register(this.vue, app);
                    this.collection[name] = instance;
                }

            }
        })

    }

}
