import {BaseCharacter} from "../../Abstracts/BaseCharacter";

/**
 * Character: Actor
 */
export class Actor extends BaseCharacter {

    get models() {
        return {
            character: '/models/Actor.json',
        }
    }

}
