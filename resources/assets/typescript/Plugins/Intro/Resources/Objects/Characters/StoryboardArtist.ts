import {BaseCharacter} from "../../Abstracts/BaseCharacter";

/**
 * Character: StoryboardArtist
 */
export class StoryboardArtist extends BaseCharacter {

    get models() {
        return {
            character: '/models/StoryboardArtist.json',
        }
    }

}
