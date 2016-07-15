import {BaseCharacter} from "./BaseCharacter";

/**
 * Character: Base
 */
export class Base extends BaseCharacter {

    models() {
        return {
            character: '/models/Base.json',
        }
    }

}
