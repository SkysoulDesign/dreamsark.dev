import {Plugins} from "./Plugins";

window['dreamsark'].exposes({
    Chart: require("easy-pie-chart")
});

export class Chart extends Plugins {

    constructor() {
        super();
    }

}

/**
 * Auto install itself
 */
window['dreamsark'].install({
    Chart
});
