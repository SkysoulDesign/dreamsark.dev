import {BaseCharacter} from "./BaseCharacter";

/**
 * Character: Editor
 */
export class Editor extends BaseCharacter {

    models() {
        return {
            character: '/models/Editor.json',
        }
    }

}
