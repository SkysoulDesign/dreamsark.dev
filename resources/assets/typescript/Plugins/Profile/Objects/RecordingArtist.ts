import {BaseCharacter} from "./BaseCharacter";

/**
 * Character: RecordingArtist
 */
export class RecordingArtist extends BaseCharacter {

    models() {
        return {
            character: '/models/RecordingArtist.json',
        }
    }

}
