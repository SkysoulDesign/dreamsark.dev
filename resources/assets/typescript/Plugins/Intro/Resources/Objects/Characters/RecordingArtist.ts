import {BaseCharacter} from "../../Abstracts/BaseCharacter";

/**
 * Character: RecordingArtist
 */
export class RecordingArtist extends BaseCharacter {

    get models() {
        return {
            character: '/models/RecordingArtist.json',
        }
    }

}
