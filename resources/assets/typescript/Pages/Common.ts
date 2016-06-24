import Vue = require("vue");
import {PageInterface} from "../interfaces/PageInterface";
import {App} from "../App";

/**
 * Common Page
 */
export class Common implements PageInterface {

    constructor(app:App, root:string = '#app-root') {

        console.log('yeah this is the app');
        console.log(app);

        /**
         * Binding Vue
         */
        app.ready().then(function () {

            new Vue({
                el: root,
            });

        })

    }

}