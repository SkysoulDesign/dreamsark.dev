import {Plugins} from "../../Abstract/Plugins";
import {App} from "../../App";
import {requireAll} from "../../Helpers";
import {Compositions} from "./Modules/Compositions";
import {Objects} from "./Modules/Loaders/Objects";
import {Loader} from "./Modules/Loader";
import {Renderer} from "./Modules/Renderer";
import {Debugger} from "./Modules/Debugger";
import {Material} from "./Modules/Loaders/Material";

require("expose?THREE!three");


export class Intro extends Plugins {

    public app: App;
    public canvas: HTMLCanvasElement;

    /**
     * Modules
     */
    public compositions: Compositions;
    public objects: Objects;
    public loader: Loader;
    public material: Material;
    public renderer: Renderer;
    public debugger: Debugger;

    /**
     * Constructor
     *
     * @param app
     * @param canvas
     */
    constructor(app, canvas) {

        super();

        if (canvas.constructor === String) {
            canvas = document.querySelector(canvas);
        }

        this.canvas = canvas;

        this.app = app;
        this.app.bootstrap(this, requireAll(
            require.context("./Modules", true, /\.js$/)
        ))

    }

    /**
     * Start The Interaction
     * @param item
     */
    start(composition: string, ...payload) {
        try {
            this.compositions.start(composition, payload);
            this.animate()
        } catch (error) {
            console.log(error)
        }
    }

    /**
     * Animation Loop
     */
    animate() {

        let clock = new THREE.Clock(),
            loop = time => {

                let delta = clock.getDelta();

                requestAnimationFrame(loop);

                /**
                 * Update Modules
                 */
                this.compositions.update(time, delta);
                this.renderer.update(time, delta);
                this.debugger.update(time, delta);

                // this.modules.forEach(
                //     module => module.update(time, delta)
                // )

            }

        /**
         * Start Loop
         */
        loop(0);

    }
}

/**
 * Auto install itself
 */
window['dreamsark'].install({
    Intro
});
