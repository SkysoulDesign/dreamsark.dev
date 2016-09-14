import {BootableInterface} from "../../../Interfaces/BootableInterface";
import {App} from "../../../App";

/**
 * Class Manager
 */
export class Manager extends THREE.LoadingManager implements BootableInterface {

    constructor() {

        super();

        this.onLoad = function () {
            // console.log('start Loading');
        }

        this.onError = function () {
            // console.log('failed loading');
        }

        this.onProgress = function () {
            // console.log('finished loading');
        }

    }

    public boot(app: App): void {
    }

    update(time: number, delta: number): void {
    }

}
