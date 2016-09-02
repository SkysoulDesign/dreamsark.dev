import {ModulesInterface} from "../../Interfaces/ModulesInterface";
import {Initializable} from "../../Abstracts/Initializable";
import {AnimationInterface} from "../../Interfaces/LoadersInterfaces";
import {zip} from "../../../Helpers";
import Promise = require("bluebird");

/**
 * Animation Class
 */
export class Animation extends Initializable implements ModulesInterface {

    /**
     * Loader
     */
    public app;
    public instances = {};

    public get collection() {
        return require.context('../../Resources/Animations', true, /\.js$/);
    }

    initialize(instance: AnimationInterface) {

        let promises = [],
            keys = Object.keys(instance.animations);

        keys.forEach(key => promises.push(
            this.app.loader.load(instance.animations[key])
        ))

        return Promise
            .all(promises)
            .then(resolutions => instance.create(
                zip(resolutions, keys)
            ))

    }

    update(time: number, delta: number): void {
    }

}
