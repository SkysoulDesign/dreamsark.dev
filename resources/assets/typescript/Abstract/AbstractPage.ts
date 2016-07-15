import {PageInterface} from "../interfaces/PageInterface";

export abstract class AbstractPage implements PageInterface {

    public app;
    public route;
    public routes = [];
    public except = [];

    constructor(app) {
        this.app = app;
    }

    public is(route:any) {

        if (route instanceof Array) {

            return !route.every(
                item => {
                    return !(this.route.match(`^${item}`))
                }
            );

        }
        // return route.match(`^${this.route}`);
    }

    public only(route:any) {
        return !this.is(route);
    }

    abstract boot(app, vue);

}
