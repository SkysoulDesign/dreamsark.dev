import {BaseCharacter} from "./BaseCharacter";

/**
 * Character: Actor
 */
export class Actor extends BaseCharacter {

    models() {
        return {
            character: '/models/Actor.json',
        }
    }

}
