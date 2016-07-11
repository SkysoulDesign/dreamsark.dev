import {BootableInterface} from "../../../Interfaces/BootableInterface";

export class Manager extends THREE.LoadingManager implements BootableInterface {

    boot(app) {
    }

    constructor() {
        super()

        this.onError = function(){
            console.log('failed loading');
        }

        this.onProgress = function(){
            console.log('finished loading');
        }

    }

}
