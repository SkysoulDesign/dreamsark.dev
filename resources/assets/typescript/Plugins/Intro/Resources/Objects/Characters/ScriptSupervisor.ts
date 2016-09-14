import {BaseCharacter} from "../../Abstracts/BaseCharacter";

/**
 * Character: ScriptSupervisor
 */
export class ScriptSupervisor extends BaseCharacter {

    get models() {
        return {
            character: '/models/ScriptSupervisor.json',
        }
    }

}
