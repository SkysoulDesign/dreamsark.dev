import Vue = require("vue");
import {AbstractPage} from "./AbstractPage";
import {app} from "../App";

/**
 * Common Page
 */
export class Common extends AbstractPage {

    public routes = ['*'];

    boot() {

        /**
         * Binding Vue
         */
        app.ready().then(function () {

            console.log('i run in all the pages');

            new Vue({
                el: '#app-root',
            });

        })

    }

}
