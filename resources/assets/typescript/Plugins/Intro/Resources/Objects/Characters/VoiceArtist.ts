import {BaseCharacter} from "../../Abstracts/BaseCharacter";

/**
 * Character: VoiceArtist
 */
export class VoiceArtist extends BaseCharacter {

    get models() {
        return {
            character: '/models/VoiceArtist.json',
        }
    }

}
