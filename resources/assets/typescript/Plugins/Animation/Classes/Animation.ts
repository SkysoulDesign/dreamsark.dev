import {Components} from "../Abstract/Components";
import {countKeys} from "../../Helpers";
import {toCamelCase} from "../../../Helpers";

/**
 * Material Class
 */
export class Animation extends Components {

    /**
     * List of Initialized Materials
     */
    private initialized = {};
    private loader;

    private animations = {
        baseAnimation: require('../Animations/BaseAnimation')
    }

    boot(app) {
        this.loader = app.loader;
    }

    /**
     * Get Material
     * @param name
     * @returns {any}
     */
    get(name:string, bones:any[], mixer):Promise {

        if (!this.animations.hasOwnProperty(name))
            return window['dreamsark'].logger.error(`No animation found with the name: ${name}`);

        if (this.initialized.hasOwnProperty(name))
            return this.initialized[name];

        return this.load(name, this.animations[name], bones, mixer);

    }

    private load(name, object, bones, mixer) {

        return new Promise((accept, reject) => {

            let animation;

            for (let i in object) {

                let instance = new object[i];
                    instance.boot(this.app);

                animation = instance.animations();

                let parsed = {},
                    counter = 1,
                    max = countKeys(animation);

                for (let name in animation) {

                    this.loader.load(animation[name], anims => {

                        animation[name] = anims;
                        parsed[name] = {}

                        anims.forEach(function (anim) {
                            let clip = mixer.clipAction(
                                THREE.AnimationClip.parseAnimation(anim, bones)
                            );

                            clip.setEffectiveWeight(1)

                            parsed[name][toCamelCase(anim.name)] = clip;
                        })

                        if (counter !== max)
                            return ++counter;

                        accept(instance.configure(parsed))

                    })
                }
            }
        })
    }
}
