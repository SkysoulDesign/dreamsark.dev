import {Application} from "../Abstract/Aplication";

/**
 * Components
 */
export class Component extends Application {

    /**
     * Components list
     * @type ComponentInterface[]
     */
    private components = [
        require('../components/Form'),
        require('../components/Ripple'),
        require('../components/Nav'),
        require('../components/Statistics'),
        require('../components/Progress'),
        require('../components/Modal'),
    ];

    /**
     * Register Components
     */
    constructor(app) {

        super(app);

        this.components.forEach(component => {
            for (let name in component) {
                if (component.hasOwnProperty(name))
                    (new component[name]).register(
                        require("vue")
                    );
            }
        })

    }

}
