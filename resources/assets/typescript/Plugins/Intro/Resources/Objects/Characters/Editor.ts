import {BaseCharacter} from "../../Abstracts/BaseCharacter";

/**
 * Character: Editor
 */
export class Editor extends BaseCharacter {

    get models() {
        return {
            character: '/models/Editor.json',
        }
    }

}
