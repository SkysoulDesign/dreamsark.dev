import {Components} from "../Abstract/Components";
import {extension} from "../../Helpers";

/**
 * Loaders
 */
require('../../../../../../node_modules/three/examples/js/loaders/FBXLoader');

/**
 * Loader Class
 */
export class Loader extends Components {

    // public fbx;
    public json;
    public png;
    public jpg;
    public anim;

    public loaded:any = {};
    private queue = [];
    private working = false;

    boot(app) {
        // this.fbx = new THREE.FBXLoader(app.manager);
        this.json = new THREE.JSONLoader(app.manager)
        this.anim = new THREE.XHRLoader(app.manager)

        let imageLoader = new THREE.TextureLoader(app.manager);

        this.png = imageLoader;
        this.jpg = imageLoader;

    }

    load(path:string, callback:Function) {

        let loader = extension(path);

        if (!this.hasOwnProperty(loader)) {
            return window['dreamsark'].logger.error(`Unknown loader:`, loader);
        }

        this.queue.push({
            loader, path, callback
        });

    }

    process() {

        if (this.working || this.queue.length < 1)
            return;

        this.working = true;

        let item = this.queue.shift();

        if (this.loaded.hasOwnProperty(item.path)) {

            item.callback(
                this.loaded[item.path].object, this.loaded[item.path].material
            )

            window['dreamsark'].logger.info('Item already in cache, loading it instead.', item.path);

            return this.working = false;
        }

        this[item.loader].load(item.path, (object, material) => {

            /**
             * Parse Json if loader is anim
             */
            if (item.loader === 'anim') {
                object = JSON.parse(object)
            }

            /**
             * Store an instance on memory
             * @type {{object: any, material: any}}
             */
            this.loaded[item.path] = {
                object, material
            };

            item.callback(object, material);

            this.working = false;

        }, () => {
        }, (error) => {
            // this.queue.push(item);
            this.working = false;
        });

    }

}
