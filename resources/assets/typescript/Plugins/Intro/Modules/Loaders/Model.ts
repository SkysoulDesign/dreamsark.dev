import {ModulesInterface} from "../../Interfaces/ModulesInterface";
import {Initializable} from "../../Abstracts/Initializable";
import Promise = require("bluebird");

/**
 * Model Class
 */
export class Model extends Initializable implements ModulesInterface {

    /**
     * Loader
     */
    public app;
    public instances = {};

    public get collection() {
        return function () {};
    }

    initialize(path: string) {
        return this.app.loader.load(path);
    }

    update(time: number, delta: number): void {}

}
