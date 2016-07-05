import {AbstractPage} from "./AbstractPage";

/**
 * Profile
 */
export class Purchase extends AbstractPage {

    public routes = [
        'user.purchase.index'
    ]

    boot() {
        console.log('i only run in purchase')
    }

}
