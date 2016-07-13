import {Components} from "../Abstract/Components";

/**
 * Compositions Class
 */
export class Compositions extends Components {

    private compositions = {
        main: require('../Compositions/Main'),
        project: require('../Compositions/Project')
    };

    private initialized = {};
    private active = null;

    boot(app) {

        window['dreamsark'].bootstrap(
            this.initialized, this.compositions
        )

    }

    /**
     *
     * @param name
     * @returns {any}
     */
    get(name) {

        if (this.initialized.hasOwnProperty(name))
            return this.initialized[name];

        console.log(`There is no composition called: ${name}`);

    }

    start(compositionName:string, payload) {

        let composition = this.get(
            compositionName
        )

        /**
         * if no composition, abort
         */
        if (!composition)
            return;

        /**
         * Setup The scene
         */
        composition.setup(this.app, ...payload);

        let characters = {},
            characterList = composition.characters(),
            callback = () => {

                composition.stage(
                    this.app.scene, this.app.camera, characters
                );

                /**
                 * Set Active Composition after Loading every character
                 * @type {any}
                 */
                this.active = {
                    characters: characters,
                    composition: composition
                };

            };

        if (!characterList)
            return callback()

        let counter = 0;

        characterList.forEach(name => {

            this.app.characters.get(name).then(character => {

                characters[name] = character;
                counter++;

                if (characterList.length === counter) {
                    callback()
                }

            });

        })

    }

    update(time, delta) {

        if (!this.active)
            return;

        this.active.composition.update(
            this.app.scene, this.app.camera, this.active.characters, time, delta
        );

    }

}
