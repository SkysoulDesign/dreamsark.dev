import {BaseCharacter} from "../../Abstracts/BaseCharacter";

/**
 * Character: MakeUpArtist
 */
export class MakeUpArtist extends BaseCharacter {

    get models() {
        return {
            character: '/models/MakeUpArtist.json',
        }
    }

}
