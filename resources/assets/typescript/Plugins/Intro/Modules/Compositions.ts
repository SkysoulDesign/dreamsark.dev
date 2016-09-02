import {requireAll} from "../../../Helpers";
import {ModulesInterface} from "../Interfaces/ModulesInterface";
import {BootableInterface} from "../../../Interfaces/BootableInterface";
import {Intro} from "../Intro";
import Promise = require("bluebird");

/**
 * Compositions Class
 */
export class Compositions implements BootableInterface, ModulesInterface {

    private app: Intro;
    private instances = {};
    private active = null;

    boot(application) {

        this.app = application;

        application.app.bootstrap(this.instances, requireAll(
            require.context("../Compositions", true, /\.js$/)
        ), this.app)

    }

    /**
     * get composition
     *
     * @param name
     * @returns {any}
     */
    get(name: string) {

        for (let index in this.instances) {
            if (this.instances[index].constructor.name.toLowerCase() === name) {
                return this.instances[index];
            }
        }

        throw `There is no composition called: ${name}`;

    }

    /**
     * Start Composition
     * @param compositionName
     * @param payload
     * @returns Promise
     */
    start(compositionName: string, payload): Promise<any> {

        let composition = this.get(
            compositionName
        );

        /**
         * Setup The scene
         */
        if (typeof composition.setup === 'function') {
            composition.setup(this.app, ...payload)
        }

        return Promise
            .map(composition.objects, (object: string) => {
                return this.app.objects.get(object)
            })
            .then(objects => {

                let objs = {};

                objects.forEach(function (b) {
                    objs[b.name] = b
                });

                composition.stage(objs);

                return objs

            })
            .then(objects => {
                this.active = {composition, objects};
            })
    }

    /**
     * Update Loop
     * @param time
     * @param delta
     */
    update(time, delta) {

        if (!this.active) return;

        this.active.composition.update(
            this.active.objects, time, delta
        );
    }
}
