import {Application} from "../Abstract/Aplication";

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
    private components = [
        require('../Components/Nav'),
        require('../Components/Form'),
        require('../Components/Ripple'),
        require('../Components/Statistics'),
        require('../Components/Progress'),
        require('../Components/Modal'),
        require('../Components/Social'),
        require('../Components/Flipper'),
        require('../Components/Steps'),
        require('../Components/Quote'),
        require('../Components/Profile'),
    ];

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
