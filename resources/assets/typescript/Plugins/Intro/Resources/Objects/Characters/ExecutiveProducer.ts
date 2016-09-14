import {BaseCharacter} from "../../Abstracts/BaseCharacter";

/**
 * Character: ExecutiveProducer
 */
export class ExecutiveProducer extends BaseCharacter {

    get models() {
        return {
            character: '/models/ExecutiveProducer.json',
        }
    }

}
