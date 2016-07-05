import Vue = require("vue");
import {AbstractPage} from "../Abstract/AbstractPage";

/**
 * Common Page
 */
export class Common extends AbstractPage {

    public routes = ['*'];

    boot(app) {
        app.logger.info('This class {Common} will run on every request');
    }

}
