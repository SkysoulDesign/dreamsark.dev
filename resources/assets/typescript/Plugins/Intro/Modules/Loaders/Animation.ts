import {ModulesInterface} from "../../Interfaces/ModulesInterface";
import {Initializable} from "../../Abstracts/Initializable";
import {toCamelCase} from "../../../../Helpers";
import Promise = require("bluebird");

/**
 * Animation Class
 */
export class Animation extends Initializable implements ModulesInterface {

    /**
     * Loader
     */
    public app;
    public instances = {};
    public mixers = [];

    public get collection() {
        return function () {};
    }

    initialize(path: string) {
        return this.app.loader.load(path);
    }

    /**
     * Create a new Animation
     *
     * @param mesh
     */
    public create(root: any, bones: any[], animations: any[]): any {

        let mixer = new THREE.AnimationMixer(root),
            parsed = {};

        this.mixers.push(mixer)

        for (let track in animations) {
            animations[track].forEach(function (anim) {
                parsed[toCamelCase(anim.name)] = mixer.clipAction(
                    THREE.AnimationClip.parseAnimation(anim, bones, track)
                );
            })
        }

        return parsed;
    }

    /**
     * Update Animations
     *
     * @param time
     * @param delta
     */
    update(time: number, delta: number): void {
        if (this.mixers.length > 0) {
            for (let i = 0; i < this.mixers.length; i++) {
                this.mixers[i].update(delta);
            }
        }
    }

}
