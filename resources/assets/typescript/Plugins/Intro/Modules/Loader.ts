import {extension} from "../../Helpers";
import {BootableInterface} from "../../../Interfaces/BootableInterface";
import {ModulesInterface} from "../Interfaces/ModulesInterface";
import Promise = require("bluebird");

/**
 * Loader Class
 */
export class Loader implements BootableInterface, ModulesInterface {

    private json;
    private png;
    private jpg;
    private anim;
    private obj;

    /**
     * Keep Track of all promises made.. its just like a cache..
     */
    public promises: any = {};

    boot({manager}) {

        this.json = new THREE.JSONLoader(manager)
        this.anim = new THREE.XHRLoader(manager)
        this.obj = new THREE.ObjectLoader(manager)

        const imageLoader = new THREE.TextureLoader(manager);

        this.png = imageLoader;
        this.jpg = imageLoader;

    }

    load(path: string): Promise<any> {

        let loader = extension(path);

        if (!this.hasOwnProperty(loader))
            throw `Unknown loader: ${loader}`;

        /**
         * If Promise has already been made... then... just give it back..
         */
        if (this.promises.hasOwnProperty(path))
            return this.promises[path]

        return this.promises[path] = new Promise((accept, reject) => {

            this[loader].load(path, (object, material) => {

                /**
                 * Parse Json if loader is anim
                 */
                if (loader === 'anim')
                    object = JSON.parse(object)

                accept(object, material);

            }, this.progress, reject)

        })

    }

    progress(event: ProgressEvent) {

    }

    update(time: number, delta: number): void {

    }

}
