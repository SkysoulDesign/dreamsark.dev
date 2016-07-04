import {CharacterInterface} from "../Interfaces/CharacterInterface";

export abstract class Character implements CharacterInterface {

    public init(name) {

        let character = this.create();
            character.name = name;
        
        return character;
    }

    abstract create();
    abstract material();

}
