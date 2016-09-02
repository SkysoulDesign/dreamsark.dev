import {ModulesInterface} from "../../Interfaces/ModulesInterface";
import {Initializable} from "../../Abstracts/Initializable";
import {zip} from "../../../Helpers";
import {MaterialInterface} from "../../Interfaces/LoadersInterfaces";
import Promise = require("bluebird");

/**
 * Material Class
 */
export class Material extends Initializable implements ModulesInterface {

    /**
     * Loader
     */
    public app;
    public instances = {};

    public get collection() {
        return require.context('../../Resources/Materials', true, /\.js$/);
    }

    initialize(instance: MaterialInterface) {

        let promises = [],
            keys = Object.keys(instance.textures);

        keys.forEach(key => promises.push(
            this.app.loader.load(instance.textures[key])
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
