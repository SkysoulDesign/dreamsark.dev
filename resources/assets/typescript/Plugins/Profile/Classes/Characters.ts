import {Character} from "../Abstract/Character";
import {Components} from "../Abstract/Components";
import {countKeys} from "../../Helpers";

/**
 * Characters Class
 */
export class Characters extends Components {

    /**
     * Characters Collection
     * @type {Character[]}
     */
    private collection = [
        require('../Characters/Designer')
    ]

    /**
     * List of Initialized Object
     * @type {THREE.Object3D[]}
     */
    private initialized = {};
    private loader;
    private app;

    constructor() {
        super();
    }

    boot(app) {

        this.app = app;
        this.loader = app.loader;
        this.collection.forEach(character => {

            for (let name in character) {
                if (character.hasOwnProperty(name)) {
                    this.init(name, {
                        loaded: false,
                        object: character[name]
                    })
                }
            }

        })

    }

    init(name:string, character) {

        return new Promise((accept, reject) => {

            if (character.object instanceof Function)
                character.object = new character.object(this.app);

            character.name = name.toLowerCase();

            if (!character.force && character.object.hasOwnProperty('defer') && character.object.defer) {

                character.loaded = false;

                this.initialized[character.name] = character

                return accept(character);

            }

            if (character.object.models instanceof Function) {

                this.load(character.object.models(), (models, materials) => {

                    character.loaded = true;
                    character.object = character.object.init(
                        character.object.name, models, materials
                    )

                    this.initialized[character.name] = character

                    return accept(character);

                })

                return null;

            }

            console.log('still to implement... if no models at all')

        })

    }

    /**
     * Get a Character
     * @param name
     * @returns {Promise<T>|Promise}
     */
    get(name:string) {

        name = name.toLowerCase();

        return new Promise((accept, reject) => {

            if (this.initialized.hasOwnProperty(name)) {

                if (!this.initialized[name].loaded) {

                    this.initialized[name].force = true;

                    this.init(name, this.initialized[name]).then(function (character) {
                        accept(character.object)
                    });

                }


            }

        })
    }

    /**
     * Load The Object with Ajax
     * @param models
     * @param callback
     */
    private load(models, callback:Function) {

        let counter = 1;
        let max = countKeys(models);

        for (let name in models) {

            this.loader.load(models[name], (object, materials) => {

                object.name = name;
                models[name] = object;

                if (counter !== max)
                    return ++counter;

                callback(models, ...materials)

            })

        }

    }

    first() {
        return;
    }

}