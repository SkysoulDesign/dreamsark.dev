import {BaseCharacter} from "../../Abstracts/BaseCharacter";

/**
 * Character: LightingArtist
 */
export class LightingArtist extends BaseCharacter {

    get models() {
        return {
            character: '/models/LightingArtist.json',
        }
    }

}
