import {BaseCharacter} from "../../Abstracts/BaseCharacter";

/**
 * Character: CostumeDesigner
 */
export class CostumeDesigner extends BaseCharacter {

    get models() {
        return {
            character: '/models/CostumeDesigner.json',
        }
    }

}
