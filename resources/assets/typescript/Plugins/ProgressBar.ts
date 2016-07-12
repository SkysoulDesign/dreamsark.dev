import {Plugins} from "./Plugins";

window['dreamsark'].exposes({
    ProgressBar: require("progressbar.js")
});

export class ProgressBar extends Plugins {

    constructor() {
        super();
    }

}

/**
 * Auto install itself
 */
window['dreamsark'].install(ProgressBar);
