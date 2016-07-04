import {Character} from "./Abstract/Character";
import {CharacterInterface} from "./Interfaces/CharacterInterface";

/**
 * Characters Class
 */
export class Characters {

    /**
     * Characters Collection
     * @type {Character[]}
     */
    private collection = [
        require('./Characters/Designer')
    ]

    /**
     * List of Initialized Object
     * @type {THREE.Object3D[]}
     */
    private initialized = [];

    constructor() {

        this.collection.forEach(character => {

            for (let name in character) {
                console.log(name)
                console.dir(character[name])
                if (character.hasOwnProperty(name)) {
                    this.initialized.push(
                        this.init(name, character[name])
                    )
                }
            }

        })

    }

    init(name:string, character) {
        return (new character()).init(name);
    }

    first() {
        return this.initialized[0];
    }

}
