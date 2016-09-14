import {BaseCharacter} from "../../Abstracts/BaseCharacter";

/**
 * Character: RenderAndComposite
 */
export class RenderAndComposite extends BaseCharacter {

    get models() {
        return {
            character: '/models/RenderAndComposite.json',
        }
    }

}
