import {BaseCharacter} from "./BaseCharacter";

/**
 * Character: Actress
 */
export class Actress extends BaseCharacter {

    models() {
        return {
            character: '/models/Actress.json',
        }
    }

}
