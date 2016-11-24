import { BootableInterface } from "../../../../Interfaces/BootableInterface";
import { Initializable } from "../../Abstracts/Initializable";
import { is } from "../../../Helpers";
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
            .then(resolutions => {

                /**
                 * Parse Animation and store it on userData.animations
                 */
                let mesh = instance.create(...resolutions);

                /**
                 * If Animation is set
                 */
                if (instance.animations) {

                    let objects = [];

                    /**
                     * hacky but... if its a group.. send the bones trough the userData
                     */
                    if (mesh instanceof THREE.Group) {

                        mesh.children.forEach(child => {

                            if (child instanceof THREE.SkinnedMesh) {
                                objects.push(child)
                            }

                        })

                    } else {
                        objects.push(mesh);
                    }

                    for (let object of objects) {

                        let actions = this.app.animation.create(
                            object, object.geometry.bones, resolutions[2]
                        );

                        /**
                         * Give a chance for the actions to be configurable
                         */
                        if (is.Function(instance.configAnimation))
                            instance.configAnimation(actions);

                        object.userData.animations = actions;

                    }

                }

                return mesh;
            });
    }

    update(time: number, delta: number): void {
    }
}
