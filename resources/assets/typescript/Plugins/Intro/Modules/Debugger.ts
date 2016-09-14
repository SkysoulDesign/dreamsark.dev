import {BootableInterface} from "../../../Interfaces/BootableInterface";
import {ModulesInterface} from "../Interfaces/ModulesInterface";
import Stats = require("stats.js");

/**
 * Debugger Class
 */
export class Debugger implements BootableInterface, ModulesInterface {

    public stats: Stats;

    constructor() {

        this.stats = new Stats();
        this.stats.showPanel(0);
        document.body.appendChild(this.stats.dom);

    }

    boot(app) {
    }

    update(time: number, delta: number): void {
        this.stats.update();
    }

}
