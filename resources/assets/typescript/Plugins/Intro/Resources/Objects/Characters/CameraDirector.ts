import {BaseCharacter} from "../../Abstracts/BaseCharacter";

/**
 * Character: CameraDirector
 */
export class CameraDirector extends BaseCharacter {

    get models() {
        return {
            character: '/models/CameraDirector.json',
        }
    }

}
