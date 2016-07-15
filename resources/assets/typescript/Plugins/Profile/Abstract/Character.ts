import {CharacterInterface} from "../Interfaces/CharacterInterface";

/**
 * Character Class
 */
export abstract class Character implements CharacterInterface {

    public animator;
    public material;
    public animation;
    public characters;
    public defer:Boolean = true;

    constructor(app) {
        this.animator = app.animator
        this.animation = app.animation
        this.material = app.material
        this.characters = app.characters
    }

    public init(name, models, textures, materials) {

        console.log('whats the name')
        console.log(name)
        let character = this.create(models, textures, materials);
            character.name = name;

        return character;

    }

    abstract create(models, textures, materials);

}
