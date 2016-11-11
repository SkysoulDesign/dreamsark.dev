import {BaseCharacter} from "./BaseCharacter";

/**
 * Character: Artist3d
 */
export class Artist3d extends BaseCharacter {

    models() {
        return {
            character: '/models/3DArtist.json',
        }
    }

}
