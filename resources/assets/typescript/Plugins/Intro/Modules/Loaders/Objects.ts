import {BootableInterface} from "../../../../Interfaces/BootableInterface";
import {Initializable} from "../../Abstracts/Initializable";
import Object3D = THREE.Object3D;
import Promise = require("bluebird");

/**
 * Objects Class
 */
export class Objects extends Initializable implements BootableInterface {

    public app;
    public instances = {};

    public get collection() {
        return require.context('../../Resources/Objects', true, /\.js$/);
    }

    /**
     * Initialize Object
     */
    public initialize(instance): Promise<any> {

        let loaders = {
            0: this.app.model,
            1: this.app.material,
            2: this.app.animation
        }

        return Promise
            .map([instance.models, instance.materials, instance.animations], (item, index) => {
                return item ? loaders[index].load(item) : null
            })
            .then(resolutions => instance.create(...resolutions));
    }
}
