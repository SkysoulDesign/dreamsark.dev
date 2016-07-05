import {PageInterface} from "../interfaces/PageInterface";

export abstract class AbstractPage implements PageInterface {

    constructor() {
    }

    abstract boot(app);

}
