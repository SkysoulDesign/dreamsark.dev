import {Components} from "../Abstract/Components";

/**
 * Animator Class
 */
export class Animator extends Components {

    private animations = [];

    constructor() {
        super();
    }

    /**
     * Create a new Animation
     *
     * @param mesh
     * @returns {THREE.AnimationMixer}
     */
    public create(mesh:THREE.Mesh) {

        let mixer = new THREE.AnimationMixer(mesh);

        this.animations.push(
            mixer
        );

        return mixer;

    }

    public push(name:string, mixer) {
        this.animations.push({
            name: name,
            mixer: mixer
        })
    }

    /**
     * Update Animations
     * @param time
     * @param delta
     */
    public update(time, delta) {

        if (this.animations.length > 0) {
            for (let i = 0; i < this.animations.length; i++) {
                this.animations[i].update(delta);
            }
        }

    }

}
