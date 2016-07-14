import {CharacterInterface} from "../Interfaces/CharacterInterface";

/**
 * Character Class
 */
export abstract class Character implements CharacterInterface {

    public animator;
    public material;
    public animation;
    public defer:Boolean = true;

    constructor(app) {
        this.animator = app.animator
        this.animation = app.animation
        this.material = app.material
    }

    public init(name, models, textures, materials) {

        let character = this.create(models, textures, materials);
            character.name = name;

        return character;

    }

    abstract create(models, textures, materials);

}
