import {BaseCharacter} from "../../Abstracts/BaseCharacter";

/**
 * Character: ProjectCoordinator
 */
export class ProjectCoordinator extends BaseCharacter {

    get models() {
        return {
            character: '/models/ProjectCoordinator.json',
        }
    }

}
