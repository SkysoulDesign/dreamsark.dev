import {ComponentInterface} from "../Interfaces/ComponentInterface";

/**
 * Profiles Component
 */
export class Profile implements ComponentInterface {

    register(vue, app) {

        vue.component('ark-profile', {
            template: require('../templates/profile/profile.html'),
            props: {
                character: String,
            }
        });

    }

}
