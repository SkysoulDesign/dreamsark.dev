import {BootableInterface} from "../../../Interfaces/BootableInterface";

export abstract class Components implements BootableInterface {

    public app;

    constructor(app){
        this.app = app;
    }

    boot(app){
    }

}
