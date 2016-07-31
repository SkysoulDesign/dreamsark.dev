import {Components} from "../Abstract/Components";
import {requireAll} from "../../../Helpers";

/**
 * Compositions Class
 */
export class Compositions extends Components {

    private compositions = requireAll(
        require.context("../Compositions", true, /\.js$/)
    );

    // private compositions = {
    //     main: require('../Compositions/Main'),
    //     project: require('../Compositions/Project')
    // };

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

        for (let index in this.initialized) {
            if (this.initialized[index].constructor.name.toLowerCase() === name) {
                return this.initialized[index];
            }
        }

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

        let objects = {},
            objectList = composition.objects(),
            callback = () => {

                composition.stage(
                    this.app.scene, this.app.camera, objects
                );

                /**
                 * Set Active Composition after Loading every object
                 * @type {any}
                 */
                this.active = {
                    objects: objects,
                    composition: composition
                };

            };

        if (!objectList)
            return callback()

        let counter = 0;

        objectList.forEach(name => {

            this.app.objects.get(name).then(object => {

                objects[name] = object;
                counter++;

                if (objectList.length === counter) {
                    callback()
                }

            });

        })

    }

    update(time, delta) {

        if (!this.active)
            return;

        this.active.composition.update(
            this.app.scene, this.app.camera, this.active.objects, time, delta
        );

    }

}
