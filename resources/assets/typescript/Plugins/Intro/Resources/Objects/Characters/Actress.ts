import {BaseCharacter} from "../../Abstracts/BaseCharacter";

/**
 * Character: Actress
 */
export class Actress extends BaseCharacter {

    get models() {
        return {
            character: '/models/Actress.json',
        }
    }

}
