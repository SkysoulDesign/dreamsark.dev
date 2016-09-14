import {BaseCharacter} from "../../Abstracts/BaseCharacter";

/**
 * Character: Artist3d
 */
export class Artist3d extends BaseCharacter {

    get models() {
        return {
            character: '/models/Artist3d.json',
        }
    }

}
