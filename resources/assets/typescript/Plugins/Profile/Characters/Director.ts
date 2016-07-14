import {BaseCharacter} from "./BaseCharacter";

/**
 * Character: Director
 */
export class Director extends BaseCharacter {

    models() {
        return {
            character: '/models/Director.json',
        }
    }

}
