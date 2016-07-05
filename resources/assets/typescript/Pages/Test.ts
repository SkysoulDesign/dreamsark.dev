import {AbstractPage} from "../Abstract/AbstractPage";

/**
 * Profile
 */
export class Test extends AbstractPage {

    public routes = [
        'user.profile.index',
    ]

    boot() {
        console.log('I Only run in profile')
    }

}
