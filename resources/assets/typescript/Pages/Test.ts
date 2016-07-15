import {AbstractPage} from "../Abstract/AbstractPage";

/**
 * Profile
 */
export class Test extends AbstractPage {

    public routes = [
        'user.profile.index',
    ]

    boot() {
        console.log('Im a test')
    }

}
