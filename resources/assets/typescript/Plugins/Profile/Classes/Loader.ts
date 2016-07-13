import {Components} from "../Abstract/Components";
import {extension} from "../../Helpers";

/**
 * Loaders
 */
require('../../../../../../node_modules/three/examples/js/loaders/FBXLoader');

export class Loader extends Components {

    public fbx;
    public json;

    boot(app) {
        this.fbx = new THREE.FBXLoader(app.manager);
        this.json = new THREE.JSONLoader(app.manager)
    }

    load(path:string, callback:Function) {

        let ext = this[extension(path)];

        if (this.hasOwnProperty(ext)) {
            return this.app.logger.error(`Unknown loader`, ext);
        }

        this[extension(path)].load(path, callback);
    }

}
