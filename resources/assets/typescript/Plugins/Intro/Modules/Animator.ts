import {BootableInterface} from "../../../Interfaces/BootableInterface";
import {ModulesInterface} from "../Interfaces/ModulesInterface";
import Promise = require('bluebird');

/**
 * Animator Class
 */
export class Animator implements BootableInterface, ModulesInterface {

    private static model;
    private static currentAnim;

    /**
     * Constructor, needs to be called first
     *
     * @param character
     * @returns {Animator}
     */
    public static from(character) {

        if (character instanceof THREE.Object3D == false)
            throw "You must to provide an object 3D"

        this.model = character;

        return this
    }

    /**
     * Play An animation
     *
     * @param anim
     * @returns {Animator}
     */
    public static play(name: string) {
        this.currentAnim = this.getAnimation(name).play();
        return this;
    }

    /**
     * Get Animation
     *
     * @param name
     * @returns {any}
     */
    private static getAnimation(name: string): any {

        if (this.model.userData.animations.hasOwnProperty(name))
            return this.model.userData.animations[name]

        throw `${this.model.name}, doesnt have an animation called: ${name} ¯\\_(ツ)_/¯`;
    }

    /**
     * CrossFade Animations
     *
     * @param anim
     * @param duration
     * @param warp
     * @returns {Animator}
     */
    public static crossFadeTo(anim: string, duration: number = .3, warp?: boolean) {

        this.currentAnim.crossFadeTo(
            this.getAnimation(anim).play(), duration, warp
        );

        return this;
    }

    public boot() {}

    /**
     * Update Animations
     * @param time
     * @param delta
     */
    public update(time: number, delta: number): void {}

}
