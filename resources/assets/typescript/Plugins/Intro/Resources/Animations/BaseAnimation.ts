/**
 * BaseAnimation Class
 */
export class BaseAnimation {

    public get animations() {
        return {
            base: '/animations/BaseAnimation.anim',
            base2: '/animations/BaseAnimation.anim'
        }
    }

    public create(animations) {
        console.log(animations)
        console.log('ceating animation')
        return animations;
    }

}
