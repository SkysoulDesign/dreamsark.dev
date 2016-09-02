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

    public loaded: any = {};

    boot({manager}) {

        this.json = new THREE.JSONLoader(manager)
        this.anim = new THREE.XHRLoader(manager)

        const imageLoader = new THREE.TextureLoader(manager);

        this.png = imageLoader;
        this.jpg = imageLoader;

    }

    load(path: string): Promise<any> {

        let loader = extension(path);

        if (!this.hasOwnProperty(loader))
            throw `Unknown loader: ${loader}`;

        return new Promise((accept, reject) => {

            if (this.loaded.hasOwnProperty(path)) {
                accept(
                    this.loaded[path].object, this.loaded[path].material
                )
            }

            this[loader].load(path, (object, material) => {

                /**
                 * Parse Json if loader is anim
                 */
                if (loader === 'anim')
                    object = JSON.parse(object)

                /**
                 * Store an instance on memory
                 */
                this.loaded[path] = {object, material};

                accept(object, material);

            }, this.progress, reject)

        })

    }

    progress(event: ProgressEvent) {

    }

    update(time: number, delta: number): void {

    }

}
