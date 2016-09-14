import {BaseCharacter} from "../../Abstracts/BaseCharacter";

/**
 * Character: SoundEffect
 */
export class SoundEffect extends BaseCharacter {

    get models() {
        return {
            character: '/models/SoundEffect.json',
        }
    }

}
