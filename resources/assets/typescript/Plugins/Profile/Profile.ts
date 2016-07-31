import {Plugins} from "../Plugins";
import {Objects} from "./Classes/Objects";
import {Camera} from "./Classes/Camera";
import {Browser} from "./Classes/Browser";
import {Controls} from "./Classes/Controls";
import {Renderer} from "./Classes/Renderer";
import {Animator} from "./Classes/Animator";
import {Light} from "./Classes/Light";
import {Scene} from "./Classes/Scene";
import {EffectComposer} from "./Classes/EffectComposer";
import {Compositions} from "./Classes/Compositions";
import {Loader} from "./Classes/Loader";

require("expose?THREE!three");

// window['dreamsark'].exposes({
//     THREE: require('three')
// });

/**
 * Profile Class
 */
export class Profile extends Plugins {

    private scene:Scene;
    private compositions:Compositions;
    private renderer:Renderer;
    private controls:Controls;
    private objects:Objects;
    private animator:Animator;
    private light:Light;
    private loader:Loader;
    private camera:Camera;
    private browser:Browser;
    private effectComposer:EffectComposer;
    private canvas:HTMLCanvasElement;

    public components = {
        camera: require('./Classes/Camera'),
        browser: require('./Classes/Browser'),
        controls: require('./Classes/Controls'),
        scene: require('./Classes/Scene'),
        compositions: require('./Classes/Compositions'),
        light: require('./Classes/Light'),
        renderer: require('./Classes/Renderer'),
        manager: require('./Classes/Manager'),
        loader: require('./Classes/Loader'),
        animator: require('./Classes/animator'),
        objects: require('./Classes/Objects'),
        material: require('./Classes/Material'),
        animation: require('./Classes/Animation'),
        effectComposer: require('./Classes/EffectComposer')
    }

    constructor(app, canvas) {

        super();

        if(canvas.constructor === String){
            canvas = <HTMLCanvasElement>document.querySelector(canvas);
        }

        this.canvas = canvas;

        app.bootstrap(this, this.components);

    }

    /**
     * Start The Interaction
     * @param item
     */
    start(composition:string, ...payload) {
        this.compositions.start(composition, payload);
        this.animate();
    }

    animate() {

        let clock = new THREE.Clock(),
            loop = time => {

                let delta = clock.getDelta();

                requestAnimationFrame(loop);

                this.loader.process();
                this.controls.update();
                this.animator.update(time, delta);
                this.light.update(time, delta);
                this.compositions.update(time, delta);
                this.renderer.update(time, delta);
                // this.effectComposer.update(time, delta);

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
    Profile
});
