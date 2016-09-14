import {BaseCharacter} from "../../Abstracts/BaseCharacter";

/**
 * Character: Screenwriter
 */
export class Screenwriter extends BaseCharacter {

    get models() {
        return {
            character: '/models/Screenwriter.json',
        }
    }

}
