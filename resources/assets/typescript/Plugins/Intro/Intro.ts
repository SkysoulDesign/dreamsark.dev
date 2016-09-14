import {Plugins} from "../../Abstract/Plugins";
import {App} from "../../App";
import {requireAll} from "../../Helpers";
import {Compositions} from "./Modules/Compositions";
import {Objects} from "./Modules/Loaders/Objects";
import {Loader} from "./Modules/Loader";
import {Renderer} from "./Modules/Renderer";
import {Debugger} from "./Modules/Debugger";
import {Material} from "./Modules/Loaders/Material";
import {Animator} from "./Modules/Animator";
import {Animation} from "./Modules/Loaders/Animation";

require("expose?THREE!three");

export class Intro extends Plugins {

    public app: App;
    public canvas: HTMLCanvasElement;
    public modules: any[];

    /**
     * Modules
     */
    public compositions: Compositions;
    public objects: Objects;
    public loader: Loader;
    public material: Material;
    public renderer: Renderer;
    public debugger: Debugger;
    public animator: Animator;
    public animation: Animation;

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
        this.modules = this.app.bootstrap(this, requireAll(
            require.context("./Modules", true, /\.js$/)
        ));

    }

    /**
     * Start The Interaction
     * @param item
     */
    start(composition: string, ...payload) {
        try {
            this.compositions
                .start(composition, payload)
                .then(() => this.animate())
                .catch(console.log);
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
                this.modules.forEach(
                    module => module.update(time, delta)
                );

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
