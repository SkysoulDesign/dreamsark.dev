import {BaseCharacter} from "../../Abstracts/BaseCharacter";

/**
 * Character: Animation
 */
export class Animation extends BaseCharacter {

    get models() {
        return {
            character: '/models/Animation.json',
        }
    }

}
