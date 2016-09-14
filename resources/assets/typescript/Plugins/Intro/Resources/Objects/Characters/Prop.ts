import {BaseCharacter} from "../../Abstracts/BaseCharacter";

/**
 * Character: Prop
 */
export class Prop extends BaseCharacter {

    get models() {
        return {
            character: '/models/Prop.json',
        }
    }

}
