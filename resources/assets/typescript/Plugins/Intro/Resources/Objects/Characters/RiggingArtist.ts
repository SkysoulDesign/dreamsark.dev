import {BaseCharacter} from "../../Abstracts/BaseCharacter";

/**
 * Character: RiggingArtist
 */
export class RiggingArtist extends BaseCharacter {

    get models() {
        return {
            character: '/models/RiggingArtist.json',
        }
    }

}
