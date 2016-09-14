import {BaseCharacter} from "../../Abstracts/BaseCharacter";

/**
 * Character: Director
 */
export class Director extends BaseCharacter {

    get models() {
        return {
            character: '/models/Director.json',
        }
    }

}
