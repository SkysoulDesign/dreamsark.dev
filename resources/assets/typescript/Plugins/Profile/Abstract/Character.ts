import {CharacterInterface} from "../Interfaces/CharacterInterface";

export abstract class Character implements CharacterInterface {

    public animator

    constructor(app) {
        this.animator = app.animator
    }

    public init(name, models, materials) {

        let character = this.create(models, materials);
        character.name = name;

        return character;
    }

    abstract create(models, materials);

    abstract material();

}
