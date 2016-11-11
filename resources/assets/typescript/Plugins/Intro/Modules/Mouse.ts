import { BootableInterface } from "../../../Interfaces/BootableInterface";
import { ModulesInterface } from "../Interfaces/ModulesInterface";
import { Browser } from "../../Animation/Classes/Browser";

/**
 * Browser Class
 */
export class Mouse implements BootableInterface, ModulesInterface {

    public x: number;
    public y: number;
    public ratio = new THREE.Vector2();
    public normalized = new THREE.Vector2();
    public browser: Browser;
    public screen = new THREE.Vector2();

    constructor(app) {
        window.addEventListener('mousemove', this.move.bind(this), false);
    }

    public boot({browser}) {
        this.browser = browser;
    }

    /**
     * On Screen Resize
     */
    private move(event: MouseEvent) {

        this.x = event.clientX;
        this.y = event.clientY;

        /**
         * Normalized
         * @type {number}
         */
        var x = -1 + (event.clientX / this.browser.width) * 2,
            y = 1 - (event.clientY / this.browser.height) * 2;

        this.normalized.set(x, y);

        this.ratio.x = event.clientX / this.browser.width;
        this.ratio.y = event.clientY / this.browser.height;

        /**
         * Screen
         */
        this.screen.set(
            event.clientX - this.browser.window.half.x, event.clientY - this.browser.window.half.y
        );

    }

    public click(callback: Function) {
        window.addEventListener('dblclick', (event) => callback());
    }

    public update(time: number, delta: number): void {
    }

}
