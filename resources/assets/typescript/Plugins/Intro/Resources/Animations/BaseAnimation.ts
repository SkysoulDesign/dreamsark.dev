/**
 * BaseAnimation Class
 */
export class BaseAnimation {

    public get animations() {
        return {
            base: '/animations/BaseAnimation.anim'
        }
    }

    public create(animations) {
        console.log(animations);
        return animations;
    }

}
