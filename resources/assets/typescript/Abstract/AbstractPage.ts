import {PageInterface} from "../interfaces/PageInterface";

export abstract class AbstractPage implements PageInterface {

    public app;

    constructor(app) {
        this.app = app;
    }

    abstract boot(app);

}
