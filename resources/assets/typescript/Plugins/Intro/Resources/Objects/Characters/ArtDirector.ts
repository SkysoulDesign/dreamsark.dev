import {BaseCharacter} from "../../Abstracts/BaseCharacter";

/**
 * Character: ArtDirector
 */
export class ArtDirector extends BaseCharacter {

    get models() {
        return {
            character: '/models/ArtDirector.json',
        }
    }

}
