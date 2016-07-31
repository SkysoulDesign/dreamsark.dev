import {BaseCharacter} from "./BaseCharacter";

/**
 * Character: Screenwriter
 */
export class Screenwriter extends BaseCharacter {

    models() {
        return {
            character: '/models/Screenwriter.json',
        }
    }

}
