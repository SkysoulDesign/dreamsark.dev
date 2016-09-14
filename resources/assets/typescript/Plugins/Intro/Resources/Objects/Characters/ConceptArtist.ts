import {BaseCharacter} from "../../Abstracts/BaseCharacter";

/**
 * Character: ConceptArtist
 */
export class ConceptArtist extends BaseCharacter {

    get models() {
        return {
            character: '/models/ConceptArtist.json',
        }
    }

}
