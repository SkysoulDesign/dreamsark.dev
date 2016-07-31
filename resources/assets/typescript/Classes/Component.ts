import {Application} from "../Abstract/Aplication";
import {requireAll} from "../Helpers";

/**
 * Components
 */
export class Component extends Application {

    /**
     * @type {{}}
     */
    public initialized = {};

    /**
     * Components list
     * @type ComponentInterface[]
     */
    requireAll(requireContext) {
        return requireContext.keys().map(function (item) {
            return 'hora'
        });
    }

    private components = requireAll(
        require.context("../Components", false, /\.js$/)
    );

    /**
     * Register Components
     */
    constructor(app) {

        super(app);

        this.components.forEach(component => {

            for (let name in component) {

                if (component.hasOwnProperty(name)) {
                    let instance = new component[name];
                    instance.register(
                        require("vue"), app
                    );
                    this.initialized[name] = instance;
                }
            }
        })

    }

}
