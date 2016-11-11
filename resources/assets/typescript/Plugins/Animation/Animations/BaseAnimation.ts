
import {AbstractAnimation} from "../Abstract/AbstractAnimation";

/**
 * BaseAnimation Class
 */
export class BaseAnimation extends AbstractAnimation {

    animations() {
        return {
            base: '/animations/BaseAnimation.anim'
        }
    }

    configure(animations) {
        return animations;
    }

}
