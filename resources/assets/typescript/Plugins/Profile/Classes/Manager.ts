import {BootableInterface} from "../../../Interfaces/BootableInterface";

/**
 * Class Manager
 */
export class Manager extends THREE.LoadingManager implements BootableInterface {

    boot(app) {
    }

    constructor(app) {

        super(app)

        console.log(this);

        this.onLoad = function(){
            // console.log('start Loading');
        }

        this.onError = function(){
            // console.log('failed loading');
        }

        this.onProgress = function(){
            // console.log('finished loading');
        }

    }

}
