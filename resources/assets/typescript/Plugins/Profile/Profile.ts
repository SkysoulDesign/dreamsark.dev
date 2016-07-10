import THREE = require('three');
global.THREE = THREE;

import {Plugins} from "../Plugins";
import {Characters} from "./Classes/Characters";
import {Camera} from "./Classes/Camera";
import {Browser} from "./Classes/Browser";
import {Controls} from "./Classes/Controls";
import {Renderer} from "./Classes/Renderer";
import {Animator} from "./Classes/Animator";
import {Light} from "./Classes/Light";
import {Scene} from "./Classes/Scene";
import {EffectComposer} from "./Classes/EffectComposer";

export class Profile extends Plugins {

    private scene:Scene;
    private renderer:Renderer;
    private controls:Controls;
    private characters:Characters;
    private animator:Animator;
    private light:Light;
    private camera:Camera;
    private browser:Browser;
    private effectComposer:EffectComposer;
    private canvas = <HTMLCanvasElement>document.querySelector('#canvas');

    public components = {
        camera: require('./Classes/Camera'),
        browser: require('./Classes/Browser'),
        controls: require('./Classes/Controls'),
        scene: require('./Classes/Scene'),
        light: require('./Classes/Light'),
        renderer: require('./Classes/Renderer'),
        manager: require('./Classes/Manager'),
        loader: require('./Classes/Loader'),
        animator: require('./Classes/animator'),
        characters: require('./Classes/Characters'),
        effectComposer: require('./Classes/EffectComposer'),
    }

    constructor(app) {

        super();

        app.bootstrap(this, this.components);

    }

    init() {

        this.characters.get('designer').then(character => {
                this.scene.add(
                    <THREE.Object3D>character
                );
            }
        )

    }

    /**
     * Start The Interaction
     * @param item
     */
    start() {
        this.init();
        this.animate();
    }

    /**
     * Switch Character
     */
    switch(id:number) {

    }

    animate() {

        let clock = new THREE.Clock(),
            loop = time => {

                let delta = clock.getDelta();

                requestAnimationFrame(loop);

                this.controls.update();
                this.animator.update(time, delta);
                this.light.update(time, delta);
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
global.app.install(Profile);
